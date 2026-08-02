const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const recruiter = require("../middleware/recruiter");

const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

// Public
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Recruiter
router.post("/", auth, recruiter, createJob);
router.put("/:id", auth, recruiter, updateJob);
router.delete("/:id", auth, recruiter, deleteJob);

module.exports = router;