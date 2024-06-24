const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/sendResponse');
const secretKey = process.env.JWT_KEY; // You should store this securely in environment variables

function jwtMiddleware(req, res, next) {
      try{
            const token = req.headers.authorization;
            if (token){
                  jwt.verify(token, secretKey, (err, admin) => {
                        if (err)return sendResponse(res,403,{success:false}) // Invalid token
                        if(!admin?.isAdmin) return sendResponse(res,403,{success:false,msg:"Not a admin"})
                        req.admin = admin; // Attach admin info to request
                        next(); // Proceed to the next middleware or route handler
                  });
            } else {
                  sendResponse(res,401,{success:false}) // No token provided
            }

      }catch(err){
            console.log("Error at adminMiddleware -",err);
            sendResponse(res,500,{success:false,msg:"Something went wrong"})
      }
}

module.exports = jwtMiddleware;
