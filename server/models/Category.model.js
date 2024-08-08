import "dotenv/config";
import mongoose from "mongoose";

const Category = new mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    images: {
      name: String,
      path: String,
    },
    created_at: Date,
    updated_at: Date,
  },
  {
    collection: "categories",
  }
);

const model = mongoose.model("categories", Category);

export default model;
