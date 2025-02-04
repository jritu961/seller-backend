import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/connect.js";  // Database connection file
import productRoutes from "./routes/productRoutes.js";  // Product routes
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
dotenv.config();  // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
// Use the product routes
app.use("/api", productRoutes);

// Start server with DB connection
const startServer = async () => {
  try {
    await connectDb();  // Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);  // Exit process if DB connection fails
  }
};

startServer();
