import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    completedTopics: [{ type: String }],
    quizScores: [
      {
        topic: String,
        score: Number,
        total: Number,
        attemptedAt: { type: Date, default: Date.now }
      }
    ],
    generatedQuestionCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
