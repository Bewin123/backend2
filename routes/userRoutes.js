const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/", async (req, res) => {
  try {
    const users = req.body;
    const insertedUsers = await User.insertMany(users);
    res.status(201).json(insertedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
