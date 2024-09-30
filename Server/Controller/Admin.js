const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const User = require("../Schema/User");
const Admin = require("../Schema/Admin");
const ShiftFee = require("../Schema/ShiftFee");
const { validationResult, params } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.KEY;
const hanldeAdminLogin = async (req, res) => {
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
    userId,
  } = req.body;
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
  const Role = JSON.parse(req.body.selectedOptions);

  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }
    if (typeof password !== "string") {
      return res
        .status(400)
        .json({ success: false, error: "Password must be a string" });
    }
    console.log("Password value: ", password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({
      name,
      userId,
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
      Role,
    });
    await newAdmin.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
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
const hanldeAdminSignUp = async (req, res) => {
  const errors = validationResult(req.body.email);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }
  const { email, name, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ Email: email, userId: name });

    if (!existingAdmin) {
      return res
        .status(400)
        .json({ error: "Invalid email or userId", success: false });
    }

    const isMatch = await bcrypt.compare(password, existingAdmin.Password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Invalid password", success: false });
    }
    const payload = { AdminId: existingAdmin._id };
    const userData = await User.find();
    const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
    res.json({
      success: true,
      auth: authToken,
      AdminData: existingAdmin,
      UserData: userData,
      id: existingAdmin._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    console.log("ram");
    res.status(500).json({ error: "Server Error", success: false });
  }
};

const GetAdminById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User ID", success: false });
  }
  try {
    const adminData = await Admin.findById(id);
    const userData = await User.find();
    if (userData && adminData) {
      res.json({ userData, adminData });
    } else {
      return res.status(404).json({ error: "Admin not found", success: false });
    }
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).send("Server error");
  }
};

const VerifyRegitration = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User ID" });
  }

  try {
    const updateResult = await User.updateOne(
      { _id: id },
      { $set: { Verify_tocken: true } }
    );

    if (updateResult.matchedCount > 0) {
      return res.status(200).json({ msg: "User verified", success: true });
    } else {
      return res
        .status(400)
        .json({ error: "User not found or already verified", success: false });
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const handleShiftFeeEntry = async (req, res) => {
  const { adminId, id } = req.params;
  const { shift, Fee } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(adminId)
  ) {
    return res
      .status(400)
      .json({ error: "Invalid User or Admin ID", success: false });
  }

  if (!shift || !Fee) {
    return res
      .status(400)
      .json({ error: "Shift and Fee fields are required", success: false });
  }

  try {
    const AdminStatus = await Admin.findById(adminId);
    const UserStatus = await User.findById(id);
    const EnterAllreadyDoneStatus = await ShiftFee.findOne({ UserId: id });
    if (AdminStatus && UserStatus && EnterAllreadyDoneStatus) {
      const updateResult = await ShiftFee.updateOne(
        { _id: EnterAllreadyDoneStatus._id },
        { $set: { Shift: shift, Fee: Fee } }
      );
      if (updateResult.matchedCount > 0) {
        const updatedData = await ShiftFee.findById(
          EnterAllreadyDoneStatus._id
        );
        return res.status(201).json({
          message: "Shift fee entry successfully updated",
          success: true,
          data: updatedData,
        });
      } else {
        return res.status(400).json({
          error: "User not found or shift fee entry not updated",
          success: false,
        });
      }
    } else if (AdminStatus && UserStatus) {
      const newShiftFee = new ShiftFee({
        Shift: shift,
        Fee,
        UserId: id,
        paymentHistory: null,
      });

      await newShiftFee.save();
      res.status(201).json({
        message: "Shift fee entry Allready Done",
        success: true,
        data: newShiftFee,
      });
    } else {
      res
        .status(404)
        .json({ error: "Admin or User not found", success: false });
    }
  } catch (error) {
    console.error("Error saving shift fee data:", error);
    res.status(500).send("Server error");
  }
};

const GetShiftFeeDataByUseId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User ID", success: false });
  }
  try {
    const shiftFeeData = await ShiftFee.findOne({ UserId: id });
    if (shiftFeeData) {
      res.status(200).json({ data: shiftFeeData });
    } else {
      return res
        .status(404)
        .json({ error: "Shift fee data not found", success: false });
    }
  } catch (error) {
    console.error("Error fetching shift fee data:", error);
    res.status(500).send("Server error");
  }
};

const handlefeePayment = async (req, res) => {
  const { startDate, EndDate, Payment } = req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ error: "Invalid User or Fee ID", success: false });
  }

  try {
    const ShiftFeeStatus = await ShiftFee.findOne({ UserId: id });
    if (!ShiftFeeStatus) {
      return res
        .status(404)
        .json({ error: "Fee data or user not found", success: false });
    }

    if (!ShiftFeeStatus.paymentHistory) {
      ShiftFeeStatus.paymentHistory = [];
    }

    ShiftFeeStatus.paymentHistory.push({
      startDate,
      EndDate,
      Payment,
    });
    await ShiftFeeStatus.save();
    return res
      .status(200)
      .json({ message: "Payment recorded successfully", success: true });
  } catch (error) {
    console.error("Error processing fee payment:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Server error", success: false });
  }
};

const RemoveUser = async (req, res) => {
  const { adminId, id } = req.params;
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(adminId)
  ) {
    return res
      .status(400)
      .json({ error: "Invalid User or Admin ID", success: false });
  }

  const AdminStatus = await Admin.findById(adminId);
  const UserStatus = await User.findByIdAndDelete(id);
  const ShiftDataStatus = await ShiftFee.findOneAndDelete({ UserId: id });
  if (AdminStatus && UserStatus && ShiftDataStatus) {
    res.status(200).json({ massage: "User All Data deleted", success: true });
  } else {
    res.status(404).json({ error: "Admin or User not found", success: false });
  }
};

module.exports = {
  hanldeAdminLogin,
  hanldeAdminSignUp,
  GetAdminById,
  VerifyRegitration,
  handleShiftFeeEntry,
  GetShiftFeeDataByUseId,
  handlefeePayment,
  RemoveUser,
};
