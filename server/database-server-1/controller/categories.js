const { toTitleCase } = require("../../config/function");
const categoryModel = require("../models/categories");

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await categoryModel.find({}).sort({ _id: -1 });
      return res.json({ Categories });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;

    if (!cName || !cDescription || !cStatus) {
      return res.json({ error: "All fields are required" });
    }

    cName = toTitleCase(cName);

    try {
      let checkCategoryExists = await categoryModel.findOne({ cName });
      if (checkCategoryExists) {
        return res.json({ error: "Category already exists" });
      }

      let newCategory = new categoryModel({ cName, cDescription, cStatus });
      await newCategory.save();

      return res.json({ success: "Category created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async postEditCategory(req, res) {
    let { cId, cDescription, cStatus } = req.body;

    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All fields are required" });
    }

    try {
      let editCategory = await categoryModel.findByIdAndUpdate(cId, {
        cDescription,
        cStatus,
        updatedAt: Date.now(),
      });

      if (editCategory) {
        return res.json({ success: "Category updated successfully" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getDeleteCategory(req, res) {
    let { cId } = req.body;

    if (!cId) {
      return res.json({ error: "Category ID is required" });
    }

    try {
      let deleteCategory = await categoryModel.findByIdAndDelete(cId);
      if (deleteCategory) {
        return res.json({ success: "Category deleted successfully" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
