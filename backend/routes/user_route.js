const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/user_auth_controller");
const authentication = require("../middlewares/Authentication");

router.route("/signup").post(userAuthController.signUp);

router.route("/login").post(authentication, userAuthController.login);

module.exports = router;
