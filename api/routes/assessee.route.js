const express = require("express");
const { Assessee,User } = require("../models/models"); 
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();


// ✅ Get assessees for the logged-in user only
router.get("/getAllUserAssessees", authMiddleware, async (req, res) => {
  try {
    // 1. Get the logged-in user (id comes from JWT)
    const user = await User.findById(req.user.id).populate("assessees");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Return only this user’s assessees
    res.status(200).json(user.assessees);
  } catch (err) {
    console.error("Error fetching user assessees:", err);
    res.status(500).json({ error: "Failed to fetch assessees" });
  }
});





module.exports = router;