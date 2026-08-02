const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: String,
        default: ""
    },

    salary: {
        type: String,
        default: ""
    },

    employmentType: {
        type: String,
        enum: ["Full-time", "Part-time", "Remote", "Hybrid", "Intern"],
        default: "Full-time"
    },

    experience: {
        type: String,
        default: ""
    },

    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    ai: {
        skills: [String],

        experience: {
            type: String,
            default: ""
        },

        education: {
            type: String,
            default: ""
        },

        summary: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending"
        }
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Job", jobSchema);