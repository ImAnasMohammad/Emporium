

// imports 
const mongoose = require('mongoose');

const Address = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true   
    },
    phone:{
        type:String,
        default:''
    },
    landMark:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:'',
        required:true
    },
    city:{
        type:String,
        default:'',
        required:true
    },
    district:{
        type:String,
        default:'',
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    
    createdAt:{
        type:Date,
        default:Date.now,
    }
});


exports.Address = mongoose.model('Address',Address);