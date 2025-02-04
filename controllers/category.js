import Product from "../model/product.js";

export const Category = async (req, res) => {
  try {
    const { category } = req.query;

    // Validate the category query parameter
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Fetch products from the database based on category
    const products = await Product.find({ category }).exec();

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for the specified category",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
