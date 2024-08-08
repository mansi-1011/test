import "dotenv/config";
import mongoose from "mongoose";

const Product = mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategories",
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    slug_name: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
      required: true,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
    },
    weight: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    quantity: {
      type: Number,
    },
    product_images: [
      {
        name: String,
        path: String,
      },
    ],
    created_at: Date,
    updated_at: Date,
  },
  {
    collection: "product",
  }
);

const model = mongoose.model("product", Product);

export default model;
