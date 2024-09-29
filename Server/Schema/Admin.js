const mongoose = require("mongoose");
const AadharCard = require("./Aadhar");
const address = require("./Address");
const CanDO = mongoose.Schema({
  Add: {
    type: String,
    required: true,
  },
  Remove: {
    type: String,
    required: true,
  },
  Edit: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Role: {
    type: [String],
    required: true,
  },
  Phone_number: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  PermanentAddress: {
    type: address,
    required: true,
  },
  ResidentalAddress: {
    type: address,
    required: true,
  },
  Aadhar: {
    type: AadharCard,
    required: true,
  },
  Image: {
    data: Buffer,
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
  Joining_date: {
    type: Date,
    default: Date.now,
  },
});
const Admin = mongoose.model("Admin", userSchema);
module.exports = Admin;
