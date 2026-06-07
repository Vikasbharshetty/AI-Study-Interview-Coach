import express from "express";
import Resume from "../models/Resume.js";
import Activity from "../models/Activity.js";
import { protect } from "../middleware/auth.js";
import { uploadResume } from "../middleware/upload.js";
import { extractPdfText } from "../utils/pdfExtractor.js";

const router = express.Router();

router.post("/upload", protect, uploadResume.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a PDF resume" });
  }

  const text = await extractPdfText(req.file.path);

  if (!text) {
    return res.status(400).json({ message: "Could not extract text from this PDF" });
  }

  const resume = await Resume.create({
    user: req.user._id,
    originalName: req.file.originalname,
    filePath: req.file.path,
    text
  });

  await Activity.create({ user: req.user._id, action: "UPLOAD_RESUME", details: req.file.originalname });

  res.status(201).json({ resume });
});

router.get("/me", protect, async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ resumes });
});

export default router;
