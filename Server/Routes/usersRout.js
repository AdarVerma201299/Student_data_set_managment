const express = require("express");
const router = express.Router();
const upload = require("../Middleware/Uploads");
const { verifyToken } = require("../Middleware/Middleware");
const { body } = require("express-validator");
const {
  handleUserSignUp,
  handleUserlogin,
  GetUserById,
} = require("../Controller/User");

router.post(
  "/register",
  upload.fields([
    { name: "FrontAadharCardImage", maxCount: 1 },
    { name: "BackAadharCardImage", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  [
    body("email").isEmail().escape(),
    body("password").isLength({ min: 6 }).escape(),
    body("aadhaar").notEmpty().withMessage("Aadhaar number is required"),
  ],
  handleUserSignUp
);

router.post(
  "/login",
  [
    body("email").isEmail().escape(),
    body("password").isLength({ min: 6 }).escape(),
  ],
  handleUserlogin
);

router.get("/profile/:id", verifyToken, GetUserById);
module.exports = router;
