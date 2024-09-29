// const express = require("express");
// const router = express.Router();
// const User = require("../Schema/User");
// const Admin = require("../Schema/Admin");
// const mongoose = require("mongoose");

// router.get("/profile/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     // Validate the ID format
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid User ID", success: false });
//     }

//     const user = await User.findById(id);
//     if (user) {
//       return res.json({ success: true, ...user._doc });
//     } else {
//       return res.status(404).json({ error: "User not found", success: false });
//     }
//   } catch (error) {
//     return res.status(500).json({ error: "Server Error", success: false });
//   }
// });

// module.exports = router;
