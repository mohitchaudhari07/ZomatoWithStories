const mongoose = require("mongoose");
const FoodPartner = require("./foodpartner.model");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  FoodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: FoodPartner,
    required: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  saveCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Food", foodSchema);
