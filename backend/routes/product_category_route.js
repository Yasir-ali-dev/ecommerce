const express = require("express");
const router = express.Router();
const productCategoryController = require("../controller/product_category_controller");
router
  .route("/")
  .get(productCategoryController.getAllProductCategories)
  .post(productCategoryController.createProductCategory);

router
  .route("/:productCategoryId")
  .get(productCategoryController.getProductCategory)
  .delete(productCategoryController.deleteProductCategory);

module.exports = router;
