const mongoose = require("mongoose");
const { cardDeckId, cardId } = require("../util/randomId");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: cardDeckId,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cards: [
    {
      id: { type: String, default: cardId },
      front: { type: String, required: true },
      back: { type: String, required: true },
      score: { type: Number, required: true, default: -1 },
    },
  ],
});

module.exports = mongoose.model("carddecks", schema);
