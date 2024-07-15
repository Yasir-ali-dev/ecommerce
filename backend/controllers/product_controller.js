const { NotFoundError, BadRequestError, CustomError } = require("../errors");
const Product = require("../models/Product");
const { ProductCategory } = require("../models/ProductCategory");
const { ProductInventory } = require("../models/ProductInventroy");
const { StatusCodes } = require("http-status-codes");
const getAllProducts = async (req, res, next) => {
  const allProducts = await Product.find();
  res.status(200).json({ products: allProducts });
};
const createProduct = async (req, res, next) => {
  const { name, description, price, barcode, category, quantity } = req.body;
  if (!name || !price || !barcode || !category || !quantity) {
    throw new BadRequestError(
      "name, price, barcode, category and quantity are required fields"
    );
  }

  const productCategory = await ProductCategory.findOne({ name: category });
  if (!productCategory) {
    throw new NotFoundError(`Category '${categoryName}' not found.`);
  }
  const productInventory = await ProductInventory.create({ quantity });
  const product = await Product.create({
    name,
    description,
    price,
    barcode,
    category: productCategory.toObject(),
    inventory: productInventory.toObject(),
  });

  res.status(StatusCodes.CREATED).json({ new_product: product });
};

const getProduct = async (req, res) => {
  const productId = req.params.productId.slice(1);
  let product;
  try {
    product = await Product.findById(productId);
  } catch (error) {
    throw new NotFoundError(`product not found with ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId.slice(1);
  let product;
  try {
    product = await Product.findByIdAndDelete(productId);
  } catch (error) {
    throw new NotFoundError(`product not found with ${productId}`);
  }
  res.status(StatusCodes.OK).json({ deleted_product: product });
};

module.exports = productController = {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
};
