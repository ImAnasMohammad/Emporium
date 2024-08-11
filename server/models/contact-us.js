

// imports 
const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
      id:mongoose.Schema.Types.ObjectId,
      name:{
            type:String,
            require:true
      },
      message:{
            type:String,
            require:true
      },
      email:{
            type:String,
            default:''
      },
      createdAt:{
            type:Date,
            default:Date.now,
        }
});


exports.Contact = mongoose.model('Contact',ContactSchema);