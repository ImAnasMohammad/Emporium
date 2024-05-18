

// imports 
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true,
        default:''
    },
    options:[{
        type:String,
        require:true,
        default:''
    }]
});


exports.Category = mongoose.model('Category',categorySchema);