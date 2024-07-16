const express = require("express");
const router = express.Router();
const userDetailsController = require("../controllers/user_details_controller");
router
  .route("/")
  .get(userDetailsController.getAllUsersDetails)
  .post(userDetailsController.createUserDetails);

router.route("/:productId");
//   .get(productController.getProduct)
//   .delete(productController.deleteProduct);

module.exports = router;
