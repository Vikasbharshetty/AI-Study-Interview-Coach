import mongoose from "mongoose";

const qaSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, default: "" }
  },
  { _id: false }
);

const questionSetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
    role: { type: String, default: "Software Developer" },
    questions: [qaSchema]
  },
  { timestamps: true }
);

export default mongoose.model("QuestionSet", questionSetSchema);
