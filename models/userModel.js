const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');  // Add uuid library for generating unique ids

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: uuidv4,
    unique: true,
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
  displayName: {
    type: String,
  },
  sudokuTimeCount:{
    type:Number,
  },
  sudokuTimes: [{ 
    time: Number,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('User', UserSchema);

