const express = require("express");
const router = express.Router();
const orderItemsController = require("../controllers/order_items_controller");
router
  .route("/")
  .get(orderItemsController.getAllOrderItems)
  .post(orderItemsController.createOrderItems);

router
  .route("/:orderItemId")
  .get(orderItemsController.getOrderItems)
  .delete(orderItemsController.deleteOrderItems);

module.exports = router;
