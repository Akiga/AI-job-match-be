const Match = require("../models/Match");

exports.createMatch = async(data)=>{

    return await Match.create(data);

}

exports.getMatch = async(userId,jobId)=>{

    return await Match.findOne({

        user:userId,

        job:jobId

    });

}

exports.getHistory = async (userId) => {

    return await Match.find({
        user: userId
    })
    .populate("job", "title company location salary")
    .sort({
        createdAt: -1
    });

};