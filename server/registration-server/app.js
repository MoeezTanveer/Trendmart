require("dotenv").config();  
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const { loginCheck } = require("./middleware/auth");
const CreateAllFolder = require("../config/uploadFolderCreateScript");
const userModel = require("./models/users"); 


const app = express();

// Check if the DATABASE URI is loaded correctly
console.log('MongoDB URI:', process.env.DATABASE);  // Debug line

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRouter);           // Authentication Routes
app.use("/api/user", usersRouter);     // User Management Routes
// ✅ Create User
// Create User
app.get("/create", async (req, res) => {
  try {
    const { name, email, password } = req.query;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check for duplicate user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const newUser = new userModel({ name, email, password, userRole: 0 });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: { name, email },
    });
  } catch (error) {
    console.error("Error in /create:", error.stack); // Updated error log
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// ✅ Read All Users
app.get("/all", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in /all:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Read a Specific User
app.get("/read", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in /read:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Update User (Name Only)
app.get("/update", async (req, res) => {
  try {
    const { name, email } = req.query;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in /update:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Delete User
app.get("/delete", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const deletedUser = await userModel.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in /delete:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Create All Uploads Folder if not exists
CreateAllFolder();

// Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Registration Server: Database connected"))
  .catch((err) => console.log("Database connection error:", err));

// Root Route (Display Group Info)
app.get("/", (req, res) => {
  res.json({
    groupNumber: "1",  
    members: ["Roman", "Laiba", "Moeez"],  
    projectTitle: "Departmental Store MERN Project",
  });
});

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Registration Server is running on port ${PORT}`);
});
