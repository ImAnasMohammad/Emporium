const {Contact} = require('../models/contact-us.js');
const express = require('express');
const router = express.Router();

// all categories routes
router.post('/',saveContact);
router.get('/:sort?',getAllContacts);
router.get('/search/:search',getContactsBySearch);
router.get('/getProduct/:id',getContactById);
router.delete('/:id',deleteContact);


function validateContactData(obj){
    const {
        name,
        email,
        message
    } = obj;

    
    if(!name) return 'Invalid Name';
    if(!email) return 'Invalid Email';
    if(!message) return 'Invalid Message';

    return false ; //if contact data is validated
}


// all route functions 


// get all contacts 
async function getAllContacts (req,res){
    try{
        const reqSort = req.params.sort ?? 0
        const sort = (reqSort>=0 && reqSort<=3 ) ? reqSort : 0  ;

        const sortList = [
            {'createdAt':1},
            {'createdAt':-1},
            {'name':1},
            {'name':-1},
        ]
        const contacts = await Contact.find().sort(sortList[sort]);
        if(!contacts){
            return res.sendStatus(500).json({success:false,msg:'Internal server error'})
        }else{
            return res.json({success:true,data:contacts})
        }
    }catch(err){
        console.log("error at contact - get ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

async function getContactsBySearch (req,res){
    try{

        const {search} = req.params;
        if(!search) return res.json({success:false,msg:'Search is empty'});

        const regex = new RegExp(search, 'i'); // i means case insensitive

        const contacts = await Contact.find({
            $or: [
                { name: regex },
                { description: regex }
            ]
        });
        if(!contacts){
            return res.sendStatus(500).json({success:false,msg:'Internal server error'})
        }else{
            return res.json({success:true,data:contacts})
        }
    }catch(err){
        console.log("error at contact - get ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

//get product by id
async function getContactById(req,res){
    try{

        const {id} = req.params;
        if(!id) return res.json({success:false,msg:'Contact ID is empty'});


        let contact = await Contact.findById(id).select('-_id');

        if(!contact) return res.json({success:false,msg:"Contact not found"})

        return res.json({success:true,data:contact})
    }catch(err){
        console.log('error at contact - get by id',err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}

// create product 
async function saveContact(req,res){
    try{
        let msg = validateContactData(req.body);
        if(msg) return res.json({success:false,msg});
        
        
        let newContact = new  Contact(req.body);
        newContact = await newContact.save();
    
        if(!newContact) return res.json({success:false,msg:"unable to save data"});
    
        return res.json({success:true,data:newContact})
    }catch(err){
        console.log("error at contact - post ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


//delete product
async function deleteContact(req,res){
    try{

        if(!req.params.id)return res.json({success:false,msg:'Invalid Contact Id'});
        let deleteContact = await Contact.findByIdAndDelete(req.params.id)
        
        if(!deleteContact) return res.json({success:false,msg:'Data cannot be deleted'})
    
        return res.json({success:true,msg:"Data deleted successfully.."})
    }catch(err){
        console.log("error at contact - delete ",err);
        return res.status(500).json({success:false,msg:"Internal server error"})
    }
}


module.exports= router