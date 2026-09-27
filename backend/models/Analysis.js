const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalMessage: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    riskLevel: {
      type: String,
      required: true,
    },

    reasons: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Analysis", analysisSchema);