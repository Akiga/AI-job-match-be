const JobService = require("../services/jobService");
const AIService = require("../services/aiService");

// CREATE
exports.createJob = async (req, res) => {
    try {

        const {
            title,
            description,
            salary,
            location,
            employmentType,
            experience
        } = req.body;

        const job = await JobService.createJob({
            title,
            description,
            salary,
            location,
            employmentType,
            experience,
            recruiter: req.user.id
        });

        // AI phân tích JD
        const aiResult = await AIService.analyzeJob({
            title,
            description,
            location,
            salary,
            employmentType,
            experience
        });

        // Lưu kết quả AI
        const updatedJob = await JobService.updateAIResult(
            job._id,
            aiResult
        );

        res.status(201).json({
            success: true,
            message: "Tạo công việc thành công.",
            data: updatedJob
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// GET ALL
exports.getAllJobs = async (req, res) => {

    try {

        const jobs = await JobService.getAllJobs();

        res.json({
            success: true,
            data: jobs
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// GET DETAIL
exports.getJobById = async (req, res) => {

    try {

        const job = await JobService.getJobById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy Job."
            });
        }

        res.json({
            success: true,
            data: job
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// UPDATE
exports.updateJob = async (req, res) => {

    const owner = await JobService.getJobOwner(req.params.id);

    if (!owner) {

        return res.status(404).json({

            success:false,

            message:"Không tìm thấy Job."

        });

    }

    if(owner.recruiter.toString() !== req.user.id){

        return res.status(403).json({

            success:false,

            message:"Bạn không có quyền."

        });

    }

    try {

        const job = await JobService.updateJob(
            req.params.id,
            req.body
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy Job."
            });
        }

        res.json({
            success: true,
            message: "Cập nhật thành công.",
            data: job
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// DELETE
exports.deleteJob = async (req, res) => {

    const owner = await JobService.getJobOwner(req.params.id);

    if (!owner) {

        return res.status(404).json({

            success:false,

            message:"Không tìm thấy Job."

        });

    }

    if(owner.recruiter.toString() !== req.user.id){

        return res.status(403).json({

            success:false,

            message:"Bạn không có quyền."

        });

    }

    try {

        const job = await JobService.deleteJob(req.params.id);

        if (!job) {

            return res.status(404).json({

                success: false,

                message: "Không tìm thấy Job."

            });

        }

        res.json({

            success: true,

            message: "Xóa thành công."

        });

    } catch (err) {

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};