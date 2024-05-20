

// imports 
const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        default:''
    },
    images:[{
        type:String
    }],
    brand:{
        type:String,
        default:''
    },
    variations:[{
        variation:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            default:0,
            min:0
        },
        quantity:{
            type:Number,
            default:0,
            min:0
        },
        discount:{
            type:Number,
            default:0,
            min:0
        }
    }],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categories',
        required:true
    },
    labels:[
        {
            type:String,
            default:''
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }
});


exports.Product = mongoose.model('Product',ProductSchema);