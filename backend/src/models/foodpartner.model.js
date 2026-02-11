const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
});

const FoodPartner = mongoose.model("foodpartner", foodPartnerSchema);
module.exports = FoodPartner;
