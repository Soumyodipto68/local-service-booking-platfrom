import Category from "../models/category.model.js";


// CREATE CATEGORY
export const createCategory = async (req, res) => {

  try {

    const { name, description, icon } = req.body;

    const existingCategory =
      await Category.findOne({ name });

    if (existingCategory) {

      return res.status(400).json({
        success: false,
        message: "Category already exists"
      });

    }

    const category = await Category.create({
      name,
      description,
      icon
    });

    res.status(201).json({
      success: true,
      category
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {

  try {

    const categories =
      await Category.find();

    res.status(200).json({
      success: true,
      categories
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};