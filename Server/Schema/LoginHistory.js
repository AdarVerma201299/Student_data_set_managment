const mongoose = require("mongoose");
const LoginHistory = new mongoose.Schema({
  Timestamp: {
    type: Date,
    default: Date.now,
  },
  ip: {
    type: String,
    required: true,
  },
  Update: {
    type: String,
  },
});

module.exports = LoginHistory;
