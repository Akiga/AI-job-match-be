const Resume = require("../models/Resume");

exports.getResumeByUser = async (userId) => {
    return await Resume.findOne({ user: userId });
};

exports.createResume = async (data) => {
    return await Resume.create(data);
};

exports.updateResume = async (id, data) => {
    return await Resume.findByIdAndUpdate(
        id,
        data,
        {
            new: true
        }
    );
};

exports.updateAIResult = async (id, aiData) => {

    return await Resume.findByIdAndUpdate(
        id,
        {
            ai: {
                ...aiData,
                status: "completed"
            }
        },
        {
            new: true
        }
    );

};

exports.getResumeByUser = async (userId) => {
    return await Resume.findOne({ user: userId });
};