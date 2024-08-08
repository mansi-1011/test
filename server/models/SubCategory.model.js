import "dotenv/config";
import mongoose from "mongoose";

const SubCategory =  mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required : true,
    },
    subcategory_name: {
      type: String,
      required: true,
    },
    subcategory_images: {
      name: String,
      path: String,
    },
    created_at: Date,
    updated_at: Date
  },
  {
    collection: "subcategories",
  }
);

const model = mongoose.model("subcategories", SubCategory);

export default model;
