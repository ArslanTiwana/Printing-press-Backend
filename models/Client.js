const mongoose = require('mongoose');
const { Schema } = mongoose;
const ClientSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    }
  });
  module.exports = mongoose.model('client', ClientSchema);