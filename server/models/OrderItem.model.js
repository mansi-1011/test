import "dotenv/config";
import mongoose from "mongoose";

const orderItem = mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    product_quantity: {
      type: number,
      required: true,
    },
    created_at: Date,
  },
  {
    collection: "order_item",
  }
);

const model = mongoose.model("order_item", orderItem);

export default model;
