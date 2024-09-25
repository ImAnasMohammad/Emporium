

const adminMiddleWare = (req,res,next)=>{
    if(!req.user || !req.user.isAdmin){
        return res.json({success:false,msg:"Unauthorized Access"});
    }
    next();
}


module.exports = adminMiddleWare