import express from "express";
import { protect } from "../middleware/auth.js";
import { topics } from "../utils/topics.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  const topicList = Object.entries(topics).map(([slug, topic]) => ({
    slug,
    title: topic.title,
    notes: topic.notes
  }));

  res.json({ topics: topicList });
});

router.get("/:topic", protect, (req, res) => {
  const topic = topics[req.params.topic.toLowerCase()];
  if (!topic) {
    return res.status(404).json({ message: "Topic not found" });
  }

  res.json({ topic });
});

export default router;
