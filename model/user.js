const mongoose = require('mongoose');

// Defining user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  age: Number,
});

module.exports = mongoose.model('User', userSchema);
