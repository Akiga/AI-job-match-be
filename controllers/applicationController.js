const Job = require("../models/Job");
const Application = require("../models/Application");
const Resume = require("../models/Resume");

exports.applyForJob = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            user: req.user.id
        });

        if (!resume) {
            return res.status(400).json({
                message: "Bạn chưa upload CV"
            });
        }

        const existed = await Application.findOne({
            job: req.params.jobId,
            user: req.user.id
        });

        if (existed) {
            return res.status(400).json({
                success: false,
                message: "Bạn đã ứng tuyển công việc này."
            });
        }

        const application = await Application.create({
            job: req.params.jobId,
            user: req.user.id,
            resume: resume._id
        });

        res.json({
            success: true,
            data: application
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Apply failed"
        });
    }
};

exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            user: req.user.id
        }).populate(
            "job",
            "title location salary employmentType"
        );

        res.json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Get applications failed"
        });
    }
};

exports.getJobApplicants = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.recruiter.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Bạn không có quyền xem ứng viên."
            });
        }

        const applications = await Application.find({
            job: req.params.jobId
        })
            .populate("user", "username email")
            .populate("resume");

        res.json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Get applicants failed"
        });
    }
};

exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate("user", "username email")
            .populate("resume")
            .populate("job", "title location salary");

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        res.json({
            success: true,
            data: application
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json({
            success: true,
            data: application
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Update failed"
        });
    }
};

exports.getRecruiterApplications = async (req, res) => {
    try {
        const jobs = await Job.find({
            recruiter: req.user.id
        }).select("_id");

        const jobIds = jobs.map(job => job._id);

        const applications = await Application.find({
            job: {
                $in: jobIds
            }
        })
            .populate("user", "username email")
            .populate("job", "title location salary")
            .populate("resume");

        res.json({
            success: true,
            data: applications
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Get recruiter applicants failed"
        });
    }
};
