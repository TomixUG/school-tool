const mongoose = require("mongoose");
const randomId = require("../util/randomId");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  refreshTokenId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("rtokens", schema);
