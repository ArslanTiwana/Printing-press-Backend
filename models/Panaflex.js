const mongoose = require('mongoose');
const { Schema } = mongoose;
const PanaflexSchema = new Schema({
    quantity:{
        type: Number,
        required: true,
    },
    sizeA:{
        type: Number,
        required: true,
    },
    sizeB:{
        type: Number,
        required: true,
    },
    scale:{ //1 for inch 2 for feet
        type: Number,
        required: true,
    },
    media:{ 
        type: String,
        required: true,
    },
    stick:{ 
        type: Boolean,
        required: true,
    },
    folding:{ 
        type: Boolean,
        required: true,
    },
    ring:{ 
        type: Boolean,
        required: true,
    },
    ringQuantity:{ 
        type: Number,
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

  module.exports = mongoose.model('panaflex', PanaflexSchema);