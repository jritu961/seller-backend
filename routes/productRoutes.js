import express from "express";
import multer from "multer";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByPriceRange
} from "../controllers/productController.js"; // Import controller functions
import {registerUser} from "../controllers/signup.js"
import {signInDAta} from "../controllers/signin.js"
import { Category } from "../controllers/category.js";
const router = express.Router();
const storage = multer.memoryStorage();
const 
upload = multer({ storage });
router.post("/products",upload.array('images', 5), addProduct);  
/////////////
router.post("/signup", registerUser);  
router.post("/signin", signInDAta);  

router.get("/products", getAllProducts);  
router.get("/products/:id", getProductById);  // Get a single product by ID
router.put("/products/:id",upload.array('images', 5), updateProduct);  // Update a product by ID
router.delete("/products/:id", deleteProduct);  // Delete a product by ID
router.get("/products/category/:category", getProductsByCategory);  // Get products by category
router.get("/products/price-range", getProductsByPriceRange);  // Get products within a price range

export default router;
