const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // Mỗi user chỉ có 1 CV
    },

    originalName: {
      type: String,
      required: true
    },

    fileName: {
      type: String,
      required: true
    },

    filePath: {
      type: String,
      required: true
    },

    sourceType: {
      type: String,
      enum: ["pdf", "portfolio", "website"],
      default: "pdf"
    },

    ai: {
      skills: [String],

      projects: [
          {
              name: String,
              description: String
          }
      ],

      education: [
          {
              school: String,
              degree: String
          }
      ],

      experience: [
          {
              company: String,
              position: String,
              duration: String
          }
      ],

      summary: String,

      status: {
          type: String,
          enum: ["pending", "completed"],
          default: "pending"
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Resume", resumeSchema);