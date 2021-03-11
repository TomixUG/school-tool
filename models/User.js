const mongoose = require("mongoose");
const { userId } = require("../util/randomId");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ///
  id: {
    type: String,
    default: userId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  permissions: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("users", schema);
