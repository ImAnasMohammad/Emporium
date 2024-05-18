

// imports 
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        require:true
    },
    mail:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        default:''
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    status:{
        type:Boolean,
        default:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    otp:{
        type:Number
    },
    
    createdAt:{
        type:Date,
        default:Date.now,
    }
});


exports.User = mongoose.model('User',UserSchema);