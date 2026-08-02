const ResumeService = require("../services/resumeService");
const JobService = require("../services/jobService");
const MatchService = require("../services/matchService");
const AIService = require("../services/aiService");

exports.matchJob = async (req, res) => {
    try {

        const jobId = req.params.jobId;
        const userId = req.user.id;

        const resume = await ResumeService.getResumeByUser(userId);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Bạn chưa upload CV."
            });
        }

        const job = await JobService.getJobById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy công việc."
            });
        }

        const existedMatch = await MatchService.getMatch(
            userId,
            jobId
        );

        if (existedMatch) {
            return res.json({
                success: true,
                data: existedMatch
            });
        }

        const aiResult = await AIService.matchResumeAndJob(
            resume.ai,
            job.ai
        );

        const match = await MatchService.createMatch({

            resume: resume._id,

            job: job._id,

            user: userId,

            ...aiResult

        });

        res.json({
            success: true,
            data: match
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

exports.getHistory = async (req, res) => {

    try {

        const history = await MatchService.getHistory(req.user.id);

        res.json({

            success: true,

            data: history

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};