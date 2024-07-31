const mongoose = require("mongoose");

const GameStatsSchema = new mongoose.Schema({

  "numOfPlayed": {
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
  "completionTime": Number,
  "avgTime": {
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
  }
});

module.exports = mongoose.model("GameStats", GameStatsSchema);
