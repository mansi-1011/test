import "dotenv/config";
import mongoose from "mongoose";

const Customer = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "customer",
  }
);

const model = mongoose.model("customer", Customer);

export default model;
