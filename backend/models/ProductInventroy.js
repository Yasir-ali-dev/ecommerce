const mongoose = require("mongoose");

const productInventorySchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, "inventory_quantity name is requied"],
    default: 100,
  },
});

const ProductInventory = mongoose.model(
  "product_inventory",
  productInventorySchema
);

module.exports = { ProductInventory, productInventorySchema };
