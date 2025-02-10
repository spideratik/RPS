// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const GameResult = require('./models/GameResult');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rock-paper-scissors', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.get('/results', async (req, res) => {
  try {
    const results = await GameResult.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/results', async (req, res) => {
  const { playerChoice, computerChoice, result } = req.body;

  const gameResult = new GameResult({
    playerChoice,
    computerChoice,
    result
  });

  try {
    const newGameResult = await gameResult.save();
    res.status(201).json(newGameResult);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
