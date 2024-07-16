const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const UserDetails = require("../models/UserDetails");

const getAllUsersDetails = async (req, res, next) => {
  const allUserDetails = await UserDetails.find({});
  res.status(StatusCodes.OK).json({ usersDetails: allUserDetails });
};

const createUserDetails = async (req, res, next) => {
  const { firstName, lastName, address, telephone, country } = req.body;
  if (!firstName || !lastName || !address) {
    throw new BadRequestError(
      "firstName, lastName and address are required field"
    );
  }
  const userDetails = await UserDetails.create({
    firstName,
    lastName,
    address,
    telephone,
    country,
  });

  res.status(StatusCodes.CREATED).json({ userDetails: userDetails });
};

/*
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

const updateUserDetails = async (req, res) => {
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
*/
module.exports = userDetailsController = {
  getAllUsersDetails,
  createUserDetails,
};
