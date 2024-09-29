const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  village: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

module.exports = addressSchema;
