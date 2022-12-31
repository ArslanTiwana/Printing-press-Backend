const mongoose = require('mongoose');
const { Schema } = mongoose;
const PlatesSchema = new Schema({
    quantity:{
        type: Number,
        required: true,
    },
    color:{
        type: Number,
        required: true,
    },
    size:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        required: true,
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required:true
    },
    status:{   //pending or completed
        type:String,
        default:"pending",
        required: true,

    },
    paidStatus:{ //paid or unpaid
        type:String,
        default:"unpaid",
        required: true,
    },
    cost:{
        type:Number
    }
  });

  module.exports = mongoose.model('plates', PlatesSchema);