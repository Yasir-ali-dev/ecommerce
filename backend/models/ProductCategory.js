const mongoose = require("mongoose");

const productCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product_category name is requied"],
      unique: [true, "product_category name should be unique"],
    },
    description: {
      type: String,
      minLength: [5, "description should be 10 or more characters"],
      default: "Others",
    },
  },
  { timestamps: true }
);

const ProductCategory = mongoose.model(
  "product_category",
  productCategorySchema
);

module.exports = { ProductCategory, productCategorySchema };
