const {expressjwt:jwt} = require('express-jwt');
const secret = process.env.JWT_KEY;



async function isRevoked(req,payload,done){
    if(!payload.isAdmin)done(null,true);
    done();
}


const authJWT = jwt({
    secret,
    algorithms:['HS256'],
    // isRevoked,
}).unless({
    path:[
        {url:/\/api\/v1\/products(.*)/,methods:['GET','OPTIONS']},
        {url:/\/api\/v1\/categories(.*)/,methods:['GET','OPTIONS']},
        {url:/\/api\/v1\/auth(.*)/,methods:['POST','GET']},
        {url:/\/api\/v1\/upload(.*)/,methods:['GET']}
    ]
});

module.exports = authJWT;