const mongoose = require("mongoose");

const orderItemsSchema = mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: [true, "order_quantity name is requied"],
      default: 1,
    },
    total: {
      type: Number,
      required: [true, "total field is requied"],
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const OrderItems = mongoose.model("order_items", orderItemsSchema);

module.exports = { OrderItems, orderItemsSchema };
