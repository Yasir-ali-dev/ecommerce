const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");
router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route("/:productId")
  .get(productController.getProduct)
  .delete(productController.deleteProduct);

module.exports = router;
