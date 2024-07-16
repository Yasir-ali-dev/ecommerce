const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnAuthorisedError,
} = require("../errors");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const bcrypt = require("bcrypt");

const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(`Email and Password fields are required!`);
  }
  const salt = await bcrypt.genSalt(11);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ email, password: hashedPassword });
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {});
  res.status(StatusCodes.CREATED).json({ user: user, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(`Email and Password fields are required!`);
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new UnAuthorisedError(`Invalid Credentials for ${email}`);
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new UnAuthorisedError(`Invalid Credentials`);
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: `user ${req.user.email} login successfully` });
};

module.exports = userAuthController = {
  signUp,
  login,
};
