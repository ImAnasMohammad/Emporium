

// imports 
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        require:true
    },
    image:{
        type:{name:{type:String},blurHash:{type:String}},
        require:true,
        default:''
    },
    options:[{
        type:String,
        require:true,
        default:''
    }],
    createAt:{
        type:Date,
        default:Date.now(),
        require:true
    }
});


exports.Category = mongoose.model('Category',categorySchema);