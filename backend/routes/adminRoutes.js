const express = require("express");

const User = require("../models/User");
const Analysis = require("../models/Analysis");
const ScamReport = require("../models/ScamReport");

const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// Admin dashboard statistics
router.get("/dashboard", adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalAnalyses = await Analysis.countDocuments();

    const totalReports = await ScamReport.countDocuments();

    const pendingReports = await ScamReport.countDocuments({
      status: "Pending",
    });

    const verifiedReports = await ScamReport.countDocuments({
      status: "Verified",
    });

    const rejectedReports = await ScamReport.countDocuments({
      status: "Rejected",
    });

    res.json({
      message: "Admin dashboard data fetched successfully",

      statistics: {
        totalUsers,
        totalAnalyses,
        totalReports,
        pendingReports,
        verifiedReports,
        rejectedReports,
      },
    });

  } catch (error) {
    console.error(
      "Admin dashboard error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;