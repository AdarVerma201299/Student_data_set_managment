const mongoose = require("mongoose");
const AadharCard = require("./Aadhar"); // Ensure Aadhar exports the schema
const addressSchema = require("./Address"); // Ensure Address exports the schema
const LoginHistory = require("./LoginHistory");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  father_name: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  School: {
    type: String,
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
  Gender: {
    type: String,
    required: true,
  },
  PermanentAddress: {
    type: addressSchema,
    required: true,
  },
  ResidentalAddress: {
    type: addressSchema,
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
  Verify_tocken: {
    type: Boolean,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
