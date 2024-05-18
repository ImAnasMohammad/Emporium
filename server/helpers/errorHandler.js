function errorHandler (err,req,res,next){
    if(err){
        if(err?.name==="UnauthorizedError"){
            res.json({success:false,msg:"The user must be authorize"});
        }


        if(err?.name==="ValidationError"){
            res.json({success:false,msg:"The user must be authorize"});
        }

        return res.json({success:false,msg:err});

    }
}

module.exports = errorHandler;