require("dotenv").config();  // Ensure the .env file is loaded
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const categoryRouter = require("./routes/categories");
const productRouter = require("./routes/products");
const { loginCheck } = require("../registration-server/middleware/auth");

const app = express();

// Check if the DATABASE URI is loaded correctly
console.log('MongoDB URI:', process.env.DATABASE);  // Debug line

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/category", loginCheck, categoryRouter);  // Protected Route for categories
app.use("/api/product", loginCheck, productRouter);    // Protected Route for products

// Database Connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => console.log("Database Server 1: Database connected"))
.catch((err) => console.log("Database connection error:", err));

// Root Route (Display Group Info)
app.get("/", (req, res) => {
  res.json({
    groupNumber: "1", 
    members: ["Roman", "Laiba", "Moeez"],  
    projectTitle: "Departmental Store",
  });
});

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Database Server 1 is running on port ${PORT}`);
});
