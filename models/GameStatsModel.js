const mongoose = require("mongoose");

const GameStatsSchema = new mongoose.Schema({
  _id: String,
  "totalGamesCompleted": {
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
  "totalCompletionTime": Number,
  "averageCompletionTime": {
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

module.exports = mongoose.model("GameStats", GameTimeSchema);
