const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const { verifyToken } = require("../Middleware/Middleware");
const uploads = require("../Middleware/Uploads");
const {
  hanldeAdminLogin,
  hanldeAdminSignUp,
  GetAdminById,
  handleShiftFeeEntry,
  GetShiftFeeDataByUseId,
  handlefeePayment,
  RemoveUser,
  VerifyRegitration,
} = require("../Controller/Admin");

router.post(
  "/Adminregister",
  uploads.fields([
    { name: "FrontAadharCardImage", maxCount: 1 },
    { name: "BackAadharCardImage", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  [
    body("email").isEmail().escape(),
    body("password").isLength({ min: 6 }).escape(),
    body("aadhaar").notEmpty().withMessage("Aadhaar number is required"),
  ],
  hanldeAdminLogin
);

router.post(
  "/Adminlogin",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("userId").notEmpty().withMessage("User ID is required"),
  ],
  hanldeAdminSignUp
);
router.get("/admin_data/:id", GetAdminById);
router.post("/VerifyUser/:id", verifyToken, VerifyRegitration);
router.post("/AddShiftFee/:adminId/:id", verifyToken, handleShiftFeeEntry);
// router.post("/UpdateShiftFee/:adminId/:id", verifyToken, UpadateShiftFeeEntry);
router.post("/FeePayment/:id", verifyToken, handlefeePayment);
router.get("/getShiftFeeData/:id", GetShiftFeeDataByUseId);
router.delete("/Delete/:adminId/:id", verifyToken, RemoveUser);
module.exports = router;
