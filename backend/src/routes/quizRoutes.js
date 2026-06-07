import express from "express";
import QuizAttempt from "../models/QuizAttempt.js";
import Progress from "../models/Progress.js";
import Activity from "../models/Activity.js";
import { protect } from "../middleware/auth.js";
import { topics } from "../utils/topics.js";

const router = express.Router();

router.post("/:topic/submit", protect, async (req, res) => {
  const topicKey = req.params.topic.toLowerCase();
  const topic = topics[topicKey];
  const answers = req.body.answers || [];

  if (!topic) {
    return res.status(404).json({ message: "Topic not found" });
  }

  const score = topic.quiz.reduce((total, question, index) => {
    return total + (answers[index] === question.correctIndex ? 1 : 0);
  }, 0);

  const attempt = await QuizAttempt.create({
    user: req.user._id,
    topic: topicKey,
    score,
    total: topic.quiz.length,
    answers
  });

  await Progress.findOneAndUpdate(
    { user: req.user._id },
    {
      $addToSet: { completedTopics: topicKey },
      $push: { quizScores: { topic: topicKey, score, total: topic.quiz.length } }
    },
    { upsert: true, new: true }
  );
  await Activity.create({ user: req.user._id, action: "SUBMIT_QUIZ", details: `${topicKey}: ${score}/${topic.quiz.length}` });

  res.status(201).json({ attempt, score, total: topic.quiz.length });
});

export default router;
