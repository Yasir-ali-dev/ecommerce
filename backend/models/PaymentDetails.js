const mongoose = require("mongoose");

const orderItemsSchema = mongoose.Schema(
  {
    net_amount: {
      type: Number,
      required: [true, "net_amount is requied"],
      min: [0, "net_amount can not be negative"],
    },
    status: {
      type: String,
      default: "Process",
    },
    orderitems: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const OrderItems = mongoose.model("order_items", orderItemsSchema);

module.exports = { OrderItems, orderItemsSchema };
