const express = require("express");
const Analysis = require("../models/Analysis");
const detectScam = require("../utils/scamDetector");

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { message, userId } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        message: "Please enter a message to analyze",
      });
    }

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    // Detect scam
    const result = detectScam(message);

    // Save analysis to MongoDB
    const analysis = await Analysis.create({
      user: userId,
      originalMessage: message,
      score: result.score,
      riskLevel: result.riskLevel,
      reasons: result.reasons,
    });

    res.json({
      message: "Analysis completed",
      analysisId: analysis._id,
      originalMessage: message,
      score: result.score,
      riskLevel: result.riskLevel,
      reasons: result.reasons,
    });
  } catch (error) {
    console.error("Analysis error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const analyses = await Analysis.find({
      user: userId,
    }).sort({ createdAt: -1 });

    res.json({
      message: "Analysis history fetched successfully",
      analyses,
    });
  } catch (error) {
    console.error("History error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;