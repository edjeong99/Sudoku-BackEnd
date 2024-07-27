const mongoose = require("mongoose");

const GameTimesSchema = new mongoose.Schema({
  _id: String,
  "playerID":String,
  difficulty: String,
  completionTime: Number,
  completedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GameTimes", GameTimesSchema);
