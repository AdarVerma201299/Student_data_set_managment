const mongoose = require("mongoose");
const AadharCardSchema = new mongoose.Schema({
  AdharNumber: {
    type: String,
    required: true,
  },
  FrontAadharCardImage: {
    data: Buffer,
    type: String,
  },
  BackAadharCardImage: {
    data: Buffer,
    type: String,
  },
});

module.exports = AadharCardSchema;
