const mongoose = require("mongoose");
const { cardDeckId } = require("../util/randomId");

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
  cards: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("carddecks", schema);
