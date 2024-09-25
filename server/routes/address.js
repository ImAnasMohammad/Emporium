const {Address} = require('../models/address.js');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware.js')


// all address routes
router.post('/',authMiddleware,createAddress);
router.get('/:id',authMiddleware,getAddressByUserId);
// router.delete('/:id',deleteAddress);
router.put('/:id',authMiddleware,updateAddress);


function validateAddressData(obj){
    const {
        userId,
        landMark,
        address,
        city,
        district,
        state,
        pincode
    } = obj;

    if(!userId) return 'Invalid User ID';
    if(!landMark) return 'Invalid land mark';
    if(!address) return 'Invalid Address';
    if(!city) return 'Invalid City';
    if(!district) return 'Invalid District';
    if(!state) return 'Invalid State';
    if(!pincode) return 'Invalid Pincode';

    return false ; //if address is validated
}


// all route functions 

//get address by user id
async function getAddressByUserId(req,res){
    try{

        const {id} = req.params;
        if(!id) return res.json({success:false,msg:'User ID is empty'});


        let address = await Address.find({userId:id});

        if(!address) return res.json({success:false,msg:"Address not found"});

        return res.json({success:true,data:address})
    }catch(err){
        console.log('error at Address - get by id',err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

// create Address 
async function createAddress(req,res){
    try{
        const userId = req.user.userId;
        let msg = validateAddressData({...req.body,userId});
        if(msg) return res.json({success:false,msg});
        

        let address = await Address.find({userId});


        if(address.length>0) return res.json({success:true,msg:"Address already exist",exist:true});
        
        let newAddress = new  Address({...req.body,userId});
        newAddress = await newAddress.save();
    
        if(!newAddress) return res.json({success:false,msg:"Address cannot be created"});
    
        return res.json({success:true,data:newAddress})
    }catch(err){
        console.log("error at Address - post ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//delete address
async function deleteAddress(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Address Id'});
        let deleteAddress = await Address.findByIdAndDelete(req.params.id)
        
        if(!deleteAddress) return res.json({success:false,msg:'Address cannot be deleted'})
    
        return res.json({success:true,msg:"Address deleted successfully.."})
    }catch(err){
        console.log("error at Address - delete ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//update product
async function updateAddress(req,res){
    try{
        const userId = req.user.userId;
        const addId = req.params.id;
        
        if(addId === null || addId === undefined || addId ===''){
            return res.json({success:false,msg:'Invalid Address Id'});
        }

        let updateAddress = await Address.findByIdAndUpdate(addId,{landMark:'guntur'})
        
        if(!updateAddress) return res.json({success:false,msg:'Address cannot be updated'})
    
        return res.json({success:true,msg:"Address updated successfully.."})
    }catch(err){
        console.log("error at address - update ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


module.exports= router