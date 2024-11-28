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
