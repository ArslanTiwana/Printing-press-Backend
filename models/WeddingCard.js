const mongoose = require('mongoose');
const { Schema } = mongoose;
const WeddingCardSchema = new Schema({
    quantity:{
        type: Number,
        required: true,
    },
    firm:{
        type: String,
        required: true,
    },
    cardColor:{
        type: String,
        required: true,
    },
    cardNumber:{ //1 for inch 2 for feet
        type: Number,
        required: true,
    },
    printingColor:{ 
        type: String,
        required: true,
    },
    mehndi:{ 
        type: [Number],
        required: true,
    },
    baraat:{ 
        type: [Number],
        required: true,
    },
    walima:{ 
        type: [Number],
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

  module.exports = mongoose.model('weddingcard', WeddingCardSchema);