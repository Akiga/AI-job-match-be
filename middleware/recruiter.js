
module.exports = (req,res,next)=>{
    if(req.user.role!=="recruiter"){
        return res.status(403).json({
            success:false,
            message:"Bạn không có quyền."
        });

    }
    next();
}