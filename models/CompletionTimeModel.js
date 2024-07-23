const mongoose = require("mongoose");

const CompletionTimeSchema = new mongoose.Schema({
  uid: String,
  difficulty: String,
  completionTime: Number,
  completedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CompletionTime", CompletionTimeSchema);
