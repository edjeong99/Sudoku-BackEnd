const mongoose = require('mongoose');

const CompletionTimeSchema = new mongoose.Schema({
    userId: String,
    difficulty: String,
    completionTime: Number,
    completedAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model('CompletionTime', CompletionTimeSchema);
