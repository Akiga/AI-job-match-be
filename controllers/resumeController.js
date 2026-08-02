const fs = require("fs");

const ResumeService = require("../services/resumeService");
const AIService = require("../services/aiService");
const Resume = require("../models/Resume");

exports.uploadResume = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng chọn file PDF."
            });
        }

        const existedResume = await ResumeService.getResumeByUser(req.user.id);

        const resumeData = {

            user: req.user.id,

            originalName: req.file.originalname,

            fileName: req.file.filename,

            filePath: req.file.path,

            sourceType: "pdf"

        };

        // Có CV rồi
        if (existedResume) {

            if (
                existedResume.filePath &&
                fs.existsSync(existedResume.filePath)
            ) {
                fs.unlinkSync(existedResume.filePath);
            }

            await ResumeService.updateResume(
                existedResume._id,
                resumeData
            );

            // Phân tích lại CV mới
            const aiResult = await AIService.analyzeResume(
                req.file.path
            );

            const updatedResume =
                await ResumeService.updateAIResult(
                    existedResume._id,
                    aiResult
                );

            return res.json({

                success: true,

                message: "Cập nhật CV thành công.",

                data: updatedResume

            });

        }

        // Chưa có CV

        const newResume =
            await ResumeService.createResume(resumeData);

        const aiResult = await AIService.analyzeResume(req.file.path);

        const updatedResume =
            await ResumeService.updateAIResult(
                newResume._id,
                aiResult
            );

        res.status(201).json({

            success: true,

            message: "Upload và phân tích CV thành công.",

            data: updatedResume

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

exports.getResume = async (req, res) => {
    try {

        const userId = req.user.id;


        const resume = await Resume.findOne({
            user: userId
        });


        if (!resume) {

            return res.status(404).json({
                message: "Resume not found"
            });

        }


        res.json(resume);


    } catch (error) {

        console.error(
            "Error fetching resume:",
            error
        );


        res.status(500).json({
            message: "Internal server error"
        });

    }
}