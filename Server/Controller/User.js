const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const User = require("../Schema/User");
const ShiftFee = require("../Schema/ShiftFee");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.KEY;
// const jwtSecret = "MynameisEndtoEndYouTubeChannel$#";

const handleUserlogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ Email: email });
    if (!existingUser) {
      return res.status(400).json({ error: "Invalid email", success: false });
    }
    const isMatch = await bcrypt.compare(password, existingUser.Password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Invalid password", success: false });
    }

    const payload = { userId: existingUser._id };
    const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    if (existingUser.Verify_tocken === true) {
      const shiftFeeData = await ShiftFee.findOne({ UserId: existingUser._id });
      res.json({
        success: true,
        auth: authToken,
        UserData: existingUser,
        id: existingUser._id,
        shiftFeeData: shiftFeeData,
      });
    } else {
      res
        .status(400)
        .json({ error: "contact to Admin to Verify your Account" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server Error", success: false });
  }
};
const handleUserSignUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }
  const {
    name,
    fatherName,
    DOB,
    email,
    Gender,
    School,
    mobile,
    aadhaar,
    password,
  } = req.body;
  console.log(req.body);
  if (!aadhaar) {
    return res.status(400).json({
      success: false,
      error: "Aadhaar number is missing or invalid",
    });
  }
  if (
    !req.files ||
    !req.files.FrontAadharCardImage ||
    !req.files.FrontAadharCardImage[0] ||
    !req.files.BackAadharCardImage ||
    !req.files.BackAadharCardImage[0] ||
    !req.files.image ||
    !req.files.image[0]
  ) {
    return res
      .status(500)
      .json({ success: false, error: "Files not uploaded correctly" });
  }

  const frontAadharCardImage = req.files.FrontAadharCardImage[0].path;
  const backAadharCardImage = req.files.BackAadharCardImage[0].path;
  const image = req.files.image[0].path;
  const residential = JSON.parse(req.body.residential);
  const permanent = JSON.parse(req.body.permanent);

  try {
    const existingUser1 = await User.findOne({ Email: email });
    const existingUser2 = await User.findOne({ Phone_number: mobile });
    const existingUser3 = await User.findOne({
      Aadhar: {
        AdharNumber: aadhaar,
      },
    });
    if (existingUser1 && existingUser2 && existingUser3) {
      return res.status(400).json({
        success: false,
        error:
          "Some Entry are allready entry Email , Mobile Number or Aadhar number",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      father_name: fatherName,
      DOB,
      School,
      Gender,
      Phone_number: mobile,
      Email: email,
      Aadhar: {
        AdharNumber: aadhaar,
        FrontAadharCardImage: frontAadharCardImage,
        BackAadharCardImage: backAadharCardImage,
      },
      Password: hashedPassword,
      ResidentalAddress: residential,
      PermanentAddress: permanent,
      Image: image,
      Verify_tocken: false,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }
    res.status(500).json({ error: "Server Error", success: false });
  }
};

const GetUserById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid User ID", success: false });
    }
    const user = await User.findById(id);

    if (user) {
      return res.json({ success: true, user: user._doc });
    } else {
      console.log("User not found");
      return res.status(404).json({ error: "User not found", success: false });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Server Error", success: false });
  }
};

module.exports = {
  handleUserlogin,
  handleUserSignUp,
  GetUserById,
};
