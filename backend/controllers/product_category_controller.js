const { BadRequestError, CustomError, NotFoundError } = require("../errors");
const { ProductCategory } = require("../models/ProductCategory");
const { StatusCodes } = require("http-status-codes");
const getAllProductCategories = async (req, res, next) => {
  const allCategories = await ProductCategory.find();
  res.status(200).json({ categories: allCategories });
};

const createProductCategory = async (req, res, next) => {
  const { name, description } = req.body;
  if (!name) {
    throw new BadRequestError("name is required field");
  }

  const productCategory = await ProductCategory.create({ name, description });

  res.status(StatusCodes.CREATED).json({ new_category: productCategory });
};

const getProductCategory = async (req, res) => {
  const productCategoryId = req.params.productCategoryId.slice(1);
  let productCategory;
  try {
    productCategory = await ProductCategory.findById(productCategoryId);
  } catch (error) {
    throw new NotFoundError(`product not found with ${productCategoryId}`);
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
    throw new NotFoundError(`product not found with ${productCategoryId}`);
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
