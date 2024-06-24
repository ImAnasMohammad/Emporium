const jwt = require('jsonwebtoken');
const sendResponse = require('../utils/sendResponse');
const secretKey = process.env.JWT_KEY; // You should store this securely in environment variables

function jwtMiddleware(req, res, next) {
      try{
            const token = req.headers.authorization;
            console.log(token)
            if (token){
                  jwt.verify(token, secretKey, (err, user) => {
                        if (err) {
                              return sendResponse(res,403,{success:false}) // Invalid token
                        }
                        req.user = user; // Attach user info to request
                        next(); // Proceed to the next middleware or route handler
                  });
            } else {
                  sendResponse(res,401,{success:false}) // No token provided
            }

      }catch(err){
            console.log("Error at userMiddleware -",err);
            sendResponse(res,500,{success:false,msg:"Something went wrong"})
      }
}

module.exports = jwtMiddleware;
