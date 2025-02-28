const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const multer = require("multer");
const Product = require("../models/products");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-product", productController.getAllProduct);
router.post("/product-by-category", productController.getProductByCategory);
router.post("/product-by-price", productController.getProductByPrice);
router.post("/wish-product", productController.getWishProduct);
router.post("/cart-product", productController.getCartProduct);

// router.post("/add-product", loginCheck, upload.any(), productController.postAddProduct);
router.post("/add-product", upload.any(), productController.postAddProduct);
router.post("/edit-product", upload.any(), productController.postEditProduct);
router.post("/delete-product", productController.getDeleteProduct);
router.post("/single-product", productController.getSingleProduct);

router.post("/add-review", productController.postAddReview);
router.post("/delete-review", productController.deleteReview);

// Create a new product
router.post("/create", async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;
    const newProduct = new Product({ name, description, price, category, quantity });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", newProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// Get all products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a product by name
router.get("/read", async (req, res) => {
  try {
    const { name } = req.query;
    const product = await Product.findOne({ name }).populate("category");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update product
router.put("/update", async (req, res) => {
  try {
    const { name, newName, description, price, category, quantity } = req.body;
    const updatedProduct = await Product.findOneAndUpdate(
      { name },
      { name: newName, description, price, category, quantity },
      { new: true }
    );
    res.json({ message: "Product updated", updatedProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete product
router.delete("/delete", async (req, res) => {
  try {
    const { name } = req.query;
    await Product.findOneAndDelete({ name });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
