

// imports 
const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        require:true
    },
    price:{
        type:Number,
        require:true,
    },
    quantity:{
        type:Number,
        require:true,
    },
    variation:{
        type:String,
        require:true,
    },
    status:{
        type:Number,
        default:1
    }
});


exports.OrderItem = mongoose.model('OrderItem',orderItemSchema);