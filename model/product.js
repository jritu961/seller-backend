import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  // Basic Product Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    // required: true,
    trim: true
  },
  brand: {
    type: String,
    // required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    default: 0,  // Percentage discount (if any)
    min: 0,
    max: 100
  },

  // Size and Fit Information
  sizes: {
    type: [String],  // Array of available sizes (e.g., ["S", "M", "L", "XL"])
    // required: true
  },
  fit: {
    type: String,  // (e.g., "Slim", "Regular", "Loose")
    enum: ["Slim", "Regular", "Loose"],
    default:["Slim"]
    // required: true
  },

  // Color Options
  colors: {
    type: [String],  // Array of available colors (e.g., ["Red", "Blue", "Black"])
    // required: true
  },

  // Material and Care
  material: {
    type: String,
    // required: true
  },
  careInstructions: {
    type: String,  // E.g., "Machine wash cold"
  },

  // Stock and Availability
  stock: {
    type: Number,
    // required: true,
    min: 0
  },
  available: {
    type: Boolean,
    default: true  // True if the product is available for sale
  },

  // Product Images
  images: [
    {
      type: String,  // URLs for product images
      required: true
    }
  ],

  // Additional Information (if needed)
  weight: {
    type: Number,  // Weight in kg or lbs
  },
  dimensions: {
    type: String,  // E.g., "30 x 20 x 10 cm"
  },

  // Shipping & Delivery Details
  shippingWeight: {
    type: Number,  // Shipping weight for logistics
  },
  shippingDuration: {
    type: String,  // Estimated delivery time (e.g., "3-5 days")
  },

  // Product Ratings and Reviews
  ratings: {
    averageRating: {
      type: Number,  // Average rating (e.g., 4.5)
      min: 1,
      max: 5
    },
    totalReviews: {
      type: Number,  // Total number of reviews
      min: 0
    }
  },

  // Promotional or Sale Information
  sale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,  // Price during sale
    min: 0
  },

  // Date Fields
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Product model

const Product = mongoose.model("Product", ProductSchema);

export default Product;
