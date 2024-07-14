const { ProductCategory } = require("../models/ProductCategory");
const { StatusCodes } = require("http-status-codes");
const getAllProductCategories = async (req, res, next) => {
  const allCategories = await ProductCategory.find();
  res.status(200).json({ categories: allCategories });
};
const createProductCategory = async (req, res, next) => {
  const { name, description } = req.body;
  if (!name) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: "name is required field",
    });
  }
  let productCategory;
  try {
    productCategory = await ProductCategory.create({ name, description });
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: `error ${JSON.stringify(error.message)}`,
    });
  }
  res.status(StatusCodes.CREATED).json({ new_category: productCategory });
};

const getProductCategory = async (req, res) => {
  const productCategoryId = req.params.productCategoryId.slice(1);
  let productCategory;
  try {
    productCategory = await ProductCategory.findById(productCategoryId);
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `product not found with ${productCategoryId}` });
  }
  res.status(StatusCodes.OK).json({ productCategory });
};

const deleteProductCategory = async (req, res) => {
  const productCategoryId = req.params.productCategoryId.slice(1);
  let productCategory;
  try {
    productCategory = await ProductCategory.findByIdAndDelete(
      productCategoryId
    );
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `product not found with ${productCategoryId}` });
  }
  res
    .status(StatusCodes.OK)
    .json({ deleted_product_category: productCategory });
};

module.exports = productController = {
  getAllProductCategories,
  createProductCategory,
  getProductCategory,
  deleteProductCategory,
};
