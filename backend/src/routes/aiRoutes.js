import express from "express";
import Resume from "../models/Resume.js";
import QuestionSet from "../models/QuestionSet.js";
import Progress from "../models/Progress.js";
import Activity from "../models/Activity.js";
import { protect } from "../middleware/auth.js";
import { generateAnswersWithClaude, generateQuestionsWithClaude } from "../utils/claude.js";

const router = express.Router();

router.post("/questions", protect, async (req, res) => {
  const { resumeId, role = "Software Developer", count = 5 } = req.body;
  const resume = await Resume.findOne({ _id: resumeId, user: req.user._id });

  if (!resume) {
    return res.status(404).json({ message: "Resume not found" });
  }

  const questions = await generateQuestionsWithClaude({
    resumeText: resume.text,
    role,
    count: Math.min(Number(count) || 5, 10)
  });

  const questionSet = await QuestionSet.create({
    user: req.user._id,
    resume: resume._id,
    role,
    questions: questions.map((question) => ({ question }))
  });

  await Progress.findOneAndUpdate(
    { user: req.user._id },
    { $inc: { generatedQuestionCount: questionSet.questions.length } },
    { upsert: true, new: true }
  );
  await Activity.create({ user: req.user._id, action: "GENERATE_QUESTIONS", details: role });

  res.status(201).json({ questionSet });
});

router.post("/answers", protect, async (req, res) => {
  const { questionSetId } = req.body;
  const questionSet = await QuestionSet.findOne({ _id: questionSetId, user: req.user._id });

  if (!questionSet) {
    return res.status(404).json({ message: "Question set not found" });
  }

  const answeredQuestions = await generateAnswersWithClaude(questionSet.questions);
  questionSet.questions = questionSet.questions.map((item) => {
    const match = answeredQuestions.find((answer) => answer.question === item.question);
    return { question: item.question, answer: match?.answer || item.answer };
  });
  await questionSet.save();

  await Activity.create({ user: req.user._id, action: "GENERATE_ANSWERS", details: String(questionSet._id) });

  res.json({ questionSet });
});

router.get("/history", protect, async (req, res) => {
  const questionSets = await QuestionSet.find({ user: req.user._id })
    .populate("resume", "originalName")
    .sort({ createdAt: -1 });

  res.json({ questionSets });
});

export default router;
