const mongoose = require('mongoose')

const PetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum:['cat', 'dog'] },
  breed: { type: String },
  age: { type: Number }, 
  gender: { type: String, enum: ['Male', 'Female'] },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', PetSchema);
