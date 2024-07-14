const Product = require("../models/Product");
const { ProductCategory } = require("../models/ProductCategory");
const { StatusCodes } = require("http-status-codes");
const getAllProducts = async (req, res, next) => {
  const allProducts = await Product.find();
  res.status(200).json({ products: allProducts });
};
const createProduct = async (req, res, next) => {
  const { name, description, price, barcode, category } = req.body;
  if (!name || !price || !barcode || !category) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: "name, price, barcode and category are required fields",
    });
  }
  let product;
  try {
    const productCategory = await ProductCategory.findOne({ name: category });
    if (!productCategory) {
      throw new Error(`Category '${categoryName}' not found.`);
    }
    product = await Product.create({
      name,
      description,
      price,
      barcode,
      category: productCategory.toObject(),
    });
  } catch (error) {
    res.json({
      status: StatusCodes.BAD_REQUEST,
      message: `error ${JSON.stringify(error.message)}`,
    });
  }
  res.status(StatusCodes.CREATED).json({ new_product: product });
};

const getProduct = async (req, res) => {
  const productId = req.params.productId.slice(1);
  let product;
  try {
    product = await Product.findById(productId);
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `product not found with ${productId}` });
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId.slice(1);
  let product;
  try {
    product = await Product.findByIdAndDelete(productId);
  } catch (error) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `product not found with ${productId}` });
  }
  res.status(StatusCodes.OK).json({ deleted_product: product });
};

module.exports = productController = {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
};
