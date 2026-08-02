const Job = require("../models/Job");

// Tạo công việc
exports.createJob = async (data) => {
    return await Job.create(data);
};

// Lấy tất cả công việc
exports.getAllJobs = async () => {
    return await Job.find()
        .populate("recruiter", "username email")
        .sort({ createdAt: -1 });
};

// Lấy chi tiết
exports.getJobById = async (id) => {
    return await Job.findById(id)
        .populate("recruiter", "username email");
};

// Cập nhật
exports.updateJob = async (id, data) => {
    return await Job.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};

// Xóa
exports.deleteJob = async (id) => {
    return await Job.findByIdAndDelete(id);
};

exports.getJobOwner = async (id) => {

    return await Job.findById(id)
        .select("recruiter");

}

exports.updateAIResult = async (id, aiData) => {

    return await Job.findByIdAndUpdate(
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

exports.getJobById = async (id) => {
    return await Job.findById(id);
};