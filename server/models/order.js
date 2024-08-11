

// imports 
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        require:true
    }],
    phone:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:'',
        required:true
    },
    landMark:{
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
    status:{
        type:Number,
        require:false,
        default:0
    },
    totalPrice:{
        type:Number,
        require:true,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    dateOrder:{
        type:Date,
        default:Date.now
    },
    deliveryOrder:{
        type:Date,
        require:true,
    },
});


exports.Order = mongoose.model('Order',orderSchema);