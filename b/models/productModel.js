import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  
    description: {
      type: String,
      required: true,
    },
    SKU: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantityOnHand: {
      type: Number,
      required: true,
    },
    // Using an array to store multiple categories for a product
    categories: [
      {
        type: String,
        required:true, 
      },
    ],
    // Add a field for storing the image path or reference
    sales: {
      type: Number, // You can store the image path or URL here
      required: true,
      default:0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
