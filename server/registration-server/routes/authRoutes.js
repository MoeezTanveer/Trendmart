const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ 1. Register a new user
router.get("/create", async (req, res) => {
  const { name, email, password } = req.query;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    return res.json({ success: "User registered successfully" });
  } catch (err) {
    console.error("Error in create route:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ 2. Log in a user
router.get("/login", async (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.json({ success: "Login successful", userId: user._id, role: user.role });
  } catch (err) {
    console.error("Error in login route:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ 3. Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ 4. Update a user's name
router.get("/update", async (req, res) => {
  const { email, name } = req.query;

  if (!email || !name) {
    return res.status(400).json({ error: "Email and new name are required" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ success: "User updated successfully", updatedUser });
  } catch (err) {
    console.error("Error in update route:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ 5. Delete a user
router.get("/delete", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ success: "User deleted successfully" });
  } catch (err) {
    console.error("Error in delete route:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
