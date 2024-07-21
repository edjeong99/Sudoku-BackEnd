const mongoose = require('mongoose');

const GameRecordSchema = new mongoose.Schema({
    playerId: String,
    difficulty: String,
    completionTime: Number,
    completedAt: { type: Date, default: Date.now }

})