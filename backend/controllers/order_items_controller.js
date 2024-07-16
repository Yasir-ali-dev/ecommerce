const { BadRequestError, NotFoundError } = require("../errors");
const { OrderItems } = require("../models/OrderItems");
const { StatusCodes } = require("http-status-codes");

const getAllOrderItems = async (req, res, next) => {
  const allOrders = await OrderItems.find({});
  res.status(StatusCodes.OK).json({ allOrders: allOrders });
};

const createOrderItems = async (req, res, next) => {
  const { quantity, total } = req.body;
  if (!quantity || !total) {
    throw new BadRequestError("quantity, total is required field");
  }
  const orderItems = await OrderItems.create({ quantity, total });
  res.status(StatusCodes.CREATED).json({ orderItems: orderItems });
};

const getOrderItems = async (req, res) => {
  const orderItemId = req.params.orderItemId.slice(1);
  const orderItem = await OrderItems.findById(orderItemId);
  if (!orderItem) {
    throw new NotFoundError(`order Items not found with ${orderItemId}`);
  }
  res.status(StatusCodes.OK).json({ orderItem });
};

const deleteOrderItems = async (req, res) => {
  const orderItemId = req.params.orderItemId.slice(1);
  const deleted_order_item = await OrderItems.findByIdAndDelete(orderItemId);
  if (!deleted_order_item) {
    throw new NotFoundError(`orderItems not found with ${orderItemId}`);
  }
  res.status(StatusCodes.OK).json({ deleted_order_item });
};

module.exports = orderItemsController = {
  getAllOrderItems,
  createOrderItems,
  getOrderItems,
  deleteOrderItems,
};
