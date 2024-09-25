const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/sendResponse');
const secretKey = process.env.JWT_KEY; 
function jwtMiddleware(req, res, next) {
      try{
            const token = req.headers.authorization;
            if (token){
                jwt.verify(token, secretKey, (err, user) => {
                    if (err) {
                        return sendResponse(res,403,{success:false,message:err.message,name:err.name}) // Invalid token
                    }
                    req.user = user;
                    next();
                });
            }else {
                sendResponse(res,401,{success:false,msg:'Token must be required'}) // No token provided
            }

      }catch(err){
            console.log("Error at userMiddleware -",err);
            sendResponse(res,500,{success:false,msg:"Something went wrong"})
      }
}

module.exports = jwtMiddleware;
