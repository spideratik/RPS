// models/GameResult.js
const mongoose = require('mongoose');

const GameResultSchema = new mongoose.Schema({
  playerChoice: { type: String, required: true },
  computerChoice: { type: String, required: true },
  result: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameResult', GameResultSchema);
