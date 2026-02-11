const mongoose = require('mongoose');

const saveModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  food: { type: mongoose.Schema.Types.ObjectId, ref: 'food', required: true },
  videoUrl: { type: String },
}, { timestamps: true });


const Save = mongoose.model('Save', saveModel);
module.exports = Save;