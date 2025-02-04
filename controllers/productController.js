import Product from "../model/product.js";  
import  cloudinary  from "../utils/cloudnary.js";
import streamifier from "streamifier"; 

export const addProduct = async (req, res) => {
  try {
    const { name, price, category} = req.body;
    const { files } = req;  

 
    if (!name || !price || !category || !files) {
      return res.status(400).json({ message: "Name, price,images and category are required" });
    }
    const imageUploadPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "products" }, 
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url); 
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
    });

    const imageUrls = await Promise.all(imageUploadPromises);

    const newProduct = new Product({
      ...req.body,
      images: imageUrls,  
    });
    console.log("🚀 ~ addProduct ~ newProduct:", newProduct)
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};

    if (category) {
      const categories = category.split(','); 
      query.category = { $in: categories }; 
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    if (!products.length) {
       return res.status(200).json({ message: "No products found" });
    }

    return res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};



// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Extract text fields and file
    const updatedData = { ...req.body };

    if (req.files && req.files.length > 0) {
      const imageUploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url); // Save the image URL
            }
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      });

      const imageUrls = await Promise.all(imageUploadPromises);
      updatedData.images = imageUrls;  // Update with Cloudinary image URLs
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    if (!products.length) {
      return res.status(404).json({ message: "No products found in this category" });
    }
    res.status(200).json({ message: "Products by category fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products by category", error: error.message });
  }
};

// Get products by price range
export const getProductsByPriceRange = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice }
    });
    if (!products.length) {
      return res.status(404).json({ message: "No products found in this price range" });
    }
    res.status(200).json({ message: "Products in price range fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

