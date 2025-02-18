const mongoose = require("mongoose");
const { productCategorySchema } = require("./ProductCategory");
const { productInventorySchema } = require("./ProductInventroy");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is requied"],
      unique: [true, "product name should be unique"],
    },
    description: {
      type: String,
      minLength: [5, "minimum should be 10 or more char"],
      default: "New Arrival",
    },
    price: {
      type: Number,
      required: [true, "price is requied"],
      min: [50, "minimum price should be 50 or greater"],
    },
    barcode: {
      type: String,
      required: [true, "product barcode is requied"],
      lowercase: true,
    },
    category: productCategorySchema,
    inventory: productInventorySchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
