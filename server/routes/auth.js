const {User} = require('../models/user.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const isValidObjectId = require('../utils/validateObjectId.js');
const sendMailOTP = require('../utils/sendMail.js');
const router = express.Router();
const userAuthMiddleware = require('../middlewares/userAuthMiddleware.js')

// all categories routes
router.get('/',getAllUsers);
router.get('/verify-token',userAuthMiddleware,verifyToken);
router.get('/verify-admin-token',userAuthMiddleware,verifyAdminToken);
router.post('/register',createUser);
router.post('/login',authUser);
router.post('/generate-otp',generateOTP);
router.post('/verify-otp',verifyOTP);
router.post('/update-password',updatePassword);
// router.get('/:id',getUserByNameRId);
// router.delete('/:id',deleteUser);
// router.put('/:id',updateUser);



function validateUserData(obj){
        const {
            name,
            mail,
            password
        } = obj;
        
        if(!name) return 'Invalid Name';
        if(!mail) return 'Invalid Mail';
        if(!password) return 'Invalid Brand Name';

        return false ; //if user is validated
    }


    // all route functions 


function verifyToken(req,res){
    res.json({success:true})
}

function verifyAdminToken(req,res){
    try{
        console.log(req.body)
    }catch(err){
        console.log("Error at -",err);
        res.json({success:false,msg:err?.message ?? "Something went wrong"})
    }
    res.json({success:true})
}

async function authUser(req,res){
    try{
        const {mail,password}= req.body;

        if(!mail || !password) return res.json({success:false,msg:'Invalid mail or password'});

        const user = await User.findOne({mail});

        if(!user) return res.json({success:false,msg:"Invalid mail or password"});

        if(!bcrypt.compareSync(password,user.password)) return res.status(200).json({success:false,msg:"Invalid username or password"});
            
        if(!user.isVerified) return res.json({success:false,msg:"Mail not verified yet."});
        if(!user.status) return res.json({success:false,msg:"Your account has been blocked."});

        const key = process.env.JWT_KEY;
        const token = jwt.sign({
            userId:user._id,
            isAdmin:user.isAdmin
        },key,{expiresIn:'7d'});


        return res.status(200).json({success:true,token,name:user.name});
        
    }catch(err){
        console.log("Error occur at users auth"+err)
        res.json({success:false,msg:"Something went wrong"})
    }
}


//update password

async function updatePassword(req,res){
    try{
        const {token,password}= req.body;
        
        if(!token || !password) return res.json({success:false,msg:'Invalid Details'});
        
        const key = process.env.JWT_KEY;
        const decoded = jwt.verify(token, key);

        if(!decoded?.id) return res.json({success:false,msg:"Invalid details"})

        const updatePassword = await User.findByIdAndUpdate(decoded?.id,{password});

        if(!updatePassword) return res.json({success:false,msg:"Something went wrong"})

        const loginToken = jwt.sign({
            userId:updatePassword.id,
            isAdmin:updatePassword.isAdmin
        },key,{expiresIn:'7d'});


        return res.status(200).json({success:true,token,msg:"Password updates successfully"});
        
    }catch(err){
        console.log("Error occur at users auth"+err)
        res.json({success:false,msg:err?.message ?? "Something went wrong"})
    }
}

//generate otp
async function generateOTP(req,res){
    try{
        const {mail} = req.body;
        
        if(!mail) return res.json({success:false,msg:"Invalid mail"});

        const existUser = await User.find({mail});

        if(existUser?.length<=0) return res.json({success:false,msg:"Invalid mail"});
        
        
        const length = 4; //length of otp

        //generating OTP
        let otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
        
        if(!sendMailOTP(mail,otp)) return res.json({success:false,msg:"Something went wrong while sending mail"}) 

        otp = await bcrypt.hash(otp,10);


        const updateOTP = await User.findByIdAndUpdate(existUser[0]._id,{otp});

        if(!updateOTP) return res.json({success:false,msg:"Something went wrong"})


        return res.json({success:true,data:existUser[0]._id})

    }catch(err){
        console.log("Error occur at generate otp"+err)
        res.json({success:false,msg:"Something went wrong"})
    }
}


async function verifyOTP(req,res){
    try{
        const {otp,id} = req.body;

        
        if(!otp || !isValidObjectId(id)) return res.json({success:false,msg:"Invalid Details"});


        const existUser = await User.findById(id);

        if(!existUser) return res.json({success:false,msg:"Invalid Details"});

        const hashOTP = existUser.otp;


        if(!hashOTP) return res.json({success:false,msg:"OTP not send yet"});


        if(!await bcrypt.compare(otp.toString(),hashOTP))return res.json({success:false,msg:"Invalid OTP"})

        if(existUser.isVerified){
            const key = process.env.JWT_KEY;
            const token = jwt.sign({
                id:existUser._id
            },key,{expiresIn:'1d'});
            
            return res.json({success:true,msg:"Verified successfully",token}) 
        }

        const updateUser = await User.findByIdAndUpdate(existUser._id,{isVerified:true});

        if(!updateUser) return res.json({success:false,msg:"Something went wrong"})


        return res.json({success:true,msg:"Verified successfully"})
    }catch(err){
        console.log("Error occur at verify otp"+err)
        res.json({success:false,msg:"Something went wrong"})
    }
}

// get all users 
async function getAllUsers (req,res){
    try{
        const users = await User.find();
        if(!users){
            return res.sendStatus(500).json({success:false,msg:'Internal server error'})
        }else{
            return res.json({success:true,data:users})
        }
    }catch(err){
        console.log("error at users - get ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

//get user by id
async function getUserByName(req,res){
    try{

        const {search} = req.params;
        if(!search) return res.json({success:false,msg:'Search is empty'});


        let users = await User.find({name:search});

        if(!users) return res.json({success:false,msg:"User not found"})

        return res.json({success:true,data:users})
    }catch(err){
        console.log('error at User - get by search',err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

// create product 
async function createUser(req,res){
    try{
        let msg = validateUserData(req.body);
        if(msg) return res.json({success:false,msg});
        
        let existUser = await User.find({mail:req.body.mail});
        
        if(existUser?.length>0){
            if(existUser[0].isVerified)return res.json({success:false,msg:'This mail already exists...'});
            return res.json({success:true,mail:req.body.mail,alreadyExist:true})
        }
        let newUser = new User({...req.body,password:bcrypt.hashSync(req.body.password,10)});
        newUser = await newUser.save();
    
        if(!newUser) return res.json({success:false,msg:"Unable to register"});
    
        return res.json({success:true,mail:req.body.mail,alreadyExist:false})
    }catch(err){
        console.log("error at user - post ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//delete product
async function deleteUser(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Product Id'});
        let deleteProduct = await Product.findByIdAndDelete(req.params.id)
        
        if(!deleteProduct) return res.json({success:false,msg:'Product cannot be deleted'})
    
        return res.json({success:true,msg:"Product deleted successfully.."})
    }catch(err){
        console.log("error at Product - delete ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//update product
async function updateUser(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Product Id'});
        let msg = validateProductData(req.body);
        
        if(msg) return res.json({success:false,msg});

        let updatedProduct = await Product.findByIdAndUpdate(req.params.id,{...req.body})
        
        if(!updatedProduct) return res.json({success:false,msg:'Product cannot be updated'})
    
        return res.json({success:true,msg:"Product updated successfully.."})
    }catch(err){
        console.log("error at product - update ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


module.exports= router