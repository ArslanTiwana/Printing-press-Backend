const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlatesSchema = new Schema({
    quantity:{
        type: Number,
        required: true,
    },
    color:{
        type: Number,
    },
    size:{
        type: String,
    },
    description:{
        type: String,
        required: true, 
    },
    created_at:{
        type:Date,
        default:date.now(),
        required: true,
    },
    client:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    }

  });

  module.exports = mongoose.model('plates', PlatesSchema);