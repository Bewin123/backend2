const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Register a new user
router.post("/register", authController.register);

// Login user
router.post("/login", authController.login);

// Forgot password - Reset password
router.post("/forgot-password", authController.resetPassword);

module.exports = router;
