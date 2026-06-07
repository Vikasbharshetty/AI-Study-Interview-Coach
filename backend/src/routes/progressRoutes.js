import express from "express";
import Progress from "../models/Progress.js";
import QuizAttempt from "../models/QuizAttempt.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  const progress = await Progress.findOne({ user: req.user._id });
  const quizAttempts = await QuizAttempt.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.json({
    progress: progress || {
      completedTopics: [],
      quizScores: [],
      generatedQuestionCount: 0
    },
    quizAttempts
  });
});

export default router;
