const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categories");
const multer = require("multer");
const { loginCheck } = require("../../registration-server/middleware/auth");
const Category = require("../models/categories");
// Image Upload setting
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/categories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-category", categoryController.getAllCategory);
router.post(
  "/add-category",
  loginCheck,
  upload.single("cImage"),
  categoryController.postAddCategory
);
router.post("/edit-category", loginCheck, categoryController.postEditCategory);
router.post(
  "/delete-category",
  loginCheck,
  categoryController.getDeleteCategory
);

// Create a new category
router.post("/create", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json({ message: "Category created successfully", newCategory });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Get all categories
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a category by name
router.get("/read", async (req, res) => {
  try {
    const { name } = req.query;
    const category = await Category.findOne({ name });
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update category
router.put("/update", async (req, res) => {
  try {
    const { name, newName, description } = req.body;
    const updatedCategory = await Category.findOneAndUpdate(
      { name },
      { name: newName, description },
      { new: true }
    );
    res.json({ message: "Category updated", updatedCategory });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete category
router.delete("/delete", async (req, res) => {
  try {
    const { name } = req.query;
    await Category.findOneAndDelete({ name });
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
