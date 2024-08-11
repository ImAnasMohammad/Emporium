const express = require('express');
const { User } = require('../models/user');
const { Address } = require('../models/address');

const authMiddleware = require('../middlewares/authMiddleware.js')

const router = express.Router();

router.get('/',getAllUsers);
router.get('/shipping-details',authMiddleware,getShippingDetails);
router.get('/:id',getUserByName);
router.delete('/:id',deleteUser);
router.put('/:id',updateUser);

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

//get basic details of user

async function getShippingDetails(req,res){
    try{
        const id = req.user.userId;
        console.log(req.user,id);
        let user = await User.findById(id).select('name mail');
        console.log(user)

        if(!user) return res.json({success:false,msg:"User not found"});


        let address = await Address.findOne({userId:id});
        if(!address){
            address={
                address:'',
                city:'',
                state:'',
                pincode:'',
                landMark:'',
                district:'',
                _id:null,
                phone:'',
            }
        }
        console.log(address)
        return res.json({success:true,data:{user,address}})
    }catch(err){
        console.log('error at User - get basic details',err);
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


module.exports = router;