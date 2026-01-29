const mongoose = require('mongoose');
const FoodPartner = require('./foodpartner.model');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,   
    required: true,
  },
  video:{
    type:String,
    required:true,
  },
  description: {
    type: String,

  },
  FoodPartner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: FoodPartner,
    required: true,
  }
})

module.exports = mongoose.model('Food', foodSchema);