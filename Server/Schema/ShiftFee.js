const mongoose = require("mongoose");
const PaySchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  EndDate: {
    type: Date,
    required: true,
  },
  Payment: {
    type: Number,
    required: true,
  },
  PaymentDate: {
    type: Date,
    default: Date.now,
  },
});
const ShiftFeeSchema = mongoose.Schema({
  Shift: {
    type: String,
    required: true,
  },
  Fee: {
    type: Number,
    required: true,
  },
  paymentHistory: {
    type: [PaySchema],
  },
  UserId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const ShiftFee = mongoose.model("ShiftFee", ShiftFeeSchema);
module.exports = ShiftFee;
