const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const mongoUrL = process.env.Url;
const MongoDB = async () => {
  try {
    await mongoose.connect(mongoUrL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
module.exports = MongoDB;
