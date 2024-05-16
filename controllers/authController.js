const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const config = require("../config");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, firstName, lastName, password } = req.body;

    // Check if the username (email) already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Forgot password - Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1h",
    });

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      // configure your email transport here
    });

    const mailOptions = {
      from: "your-email@example.com",
      to: user.email,
      subject: "Password Reset",
      text: `To reset your password, click on this link: ${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Other authentication related functions can be added here
