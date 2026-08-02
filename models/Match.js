const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
{
    resume:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Resume",
        required:true
    },

    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    score:{
        type:Number,
        default:0
    },

    matchedSkills:[String],

    missingSkills:[String],

    strengths:[String],

    weaknesses:[String],

    suggestions:[String]
},
{
    timestamps:true
});

module.exports = mongoose.model("Match",matchSchema);