const express = require("express");
const ScamReport = require("../models/ScamReport");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// ==========================================
// Submit a scam report
// ==========================================

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      message,
      category,
      description,
    } = req.body;

    if (!userId || !message || !category) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const report = await ScamReport.create({
      user: userId,
      message,
      category,
      description,
    });

    res.status(201).json({
      message: "Scam report submitted successfully",
      report,
    });
  } catch (error) {
    console.error(
      "Report submission error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==========================================
// Get all scam reports
// ==========================================

router.get("/", async (req, res) => {
  try {
    const reports = await ScamReport.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      message: "Scam reports fetched successfully",
      reports,
    });
  } catch (error) {
    console.error(
      "Fetch reports error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});


// ==========================================
// Verify a scam report
// ADMIN ONLY
// ==========================================

router.put(
  "/:id/verify",
  adminMiddleware,
  async (req, res) => {
    try {
      const report =
        await ScamReport.findByIdAndUpdate(
          req.params.id,
          {
            status: "Verified",
          },
          {
            new: true,
          }
        );

      if (!report) {
        return res.status(404).json({
          message: "Scam report not found",
        });
      }

      res.json({
        message:
          "Scam report verified successfully",
        report,
      });
    } catch (error) {
      console.error(
        "Verify report error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);


// ==========================================
// Reject a scam report
// ADMIN ONLY
// ==========================================

router.put(
  "/:id/reject",
  adminMiddleware,
  async (req, res) => {
    try {
      const report =
        await ScamReport.findByIdAndUpdate(
          req.params.id,
          {
            status: "Rejected",
          },
          {
            new: true,
          }
        );

      if (!report) {
        return res.status(404).json({
          message: "Scam report not found",
        });
      }

      res.json({
        message:
          "Scam report rejected successfully",
        report,
      });
    } catch (error) {
      console.error(
        "Reject report error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);


module.exports = router;