

// imports 
const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    variation:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        default:0,
        min:0
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});


exports.Cart = mongoose.model('Cart',cartSchema);