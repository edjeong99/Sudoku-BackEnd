const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Add uuid library for generating unique ids

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
  nickName: {
    type: String,
    default: "Player",
  },
  timeStat: {
    count: {
      Easy: {
        type: Number,
        default: 0,
      },
      Medium: {
        type: Number,
        default: 0,
      },
      Hard: {
        type: Number,
        default: 0,
      },
      Total: {
        type: Number,
        default: 0,
      },
    },
    avgTime: {
      Easy: {
        type: Number,
        default: 0,
      },
      Medium: {
        type: Number,
        default: 0,
      },
      Hard: {
        type: Number,
        default: 0,
      },
      Total: {
        type: Number,
        default: 0,
      },
    },
  },
});

module.exports = mongoose.model("User", UserSchema);

// sudokuTimes: [{
//   time: Number,
//   difficulty: String,
//   date: { type: Date, default: Date.now }
// }]
