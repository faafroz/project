import express from "express";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user
    const result = await user.save();
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Handle unique email (duplicate key) error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        data: "User already exists!",
      });
    }

    // Handle other errors
    console.error("Error during signup:", error);
    res.status(500).json({
      success: false,
      data: "An error occurred during signup.",
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        data: "Could not find user",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        data: "Invalid password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      "secret_this_should_be_longer",
      { expiresIn: "1h" }
    );

    // Send response
    res.status(200).json({
      success: true,
      token: token,
      expiresIn: 3600, // expires in 1 hour
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      data: "An error occurred during login.",
    });
  }
});

export default router;
