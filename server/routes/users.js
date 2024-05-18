const {User} = require('../models/user.js');
const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();

// all categories routes
router.post('/',createUser);
router.get('/',getAllUsers);
// router.get('/:id',getUserByNameRId);
// router.delete('/:id',deleteUser);
// router.put('/:id',updateUser);

router.post('/login',authUser);



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


async function authUser(req,res){
    const {mail,password}= req.body;

    if(!mail || !password) return res.json({success:false,msg:'Invalid username or password'});

    const user = await User.findOne({mail});

    if(!user) return res.json({success:false,msg:"Invalid username or password"});

    if(user && bcrypt.compareSync(password,user.password)){

        if(!user.isVerified) return res.json({success:false,msg:"Mail not verified yet."});
        if(!user.status) return res.json({success:false,msg:"Your account has been blocked."});

        const key = process.env.JWT_KEY;
        const token = jwt.sign({
            userId:user._id,
            isAdmin:user.isAdmin
        },key,{expiresIn:'7d'});


        return res.status(200).json({success:true,token});
    }
    return res.status(200).json({success:false,msg:"Invalid username or password"});
}


// get all product 
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

//get product by id
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
            return res.json({success:true,data:existUser[0]})
        }
        let newUser = new User({...req.body,password:bcrypt.hashSync(req.body.password,10)});
        newUser = await newUser.save();
    
        if(!newUser) return res.json({success:false,msg:"Unable to register"});
    
        return res.json({success:true,data:newUser})
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