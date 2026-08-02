const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const {
    applyForJob,
    getMyApplications,
    getJobApplicants,
    getApplicationById,
    updateApplicationStatus,
    getRecruiterApplications
} = require("../controllers/applicationController");

router.post("/:jobId", auth, applyForJob);
router.get("/", auth, getMyApplications);
router.get("/job/:jobId", auth, getJobApplicants);
router.get("/:id", auth, getApplicationById);
router.patch("/:id/status", auth, updateApplicationStatus);
router.get("/recruiter/all", auth, getRecruiterApplications);

module.exports = router;
