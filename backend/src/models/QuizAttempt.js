import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    answers: [{ type: Number }]
  },
  { timestamps: true }
);

export default mongoose.model("QuizAttempt", quizAttemptSchema);
