const mongoose = require("mongoose");
const userDetailSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "firstName is requied"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is requied"],
  },
  telephone: {
    type: String,
    minLength: [11, "telephone should be 11 digit"],
    maxLength: [11, "telephone should be 11 digit"],
  },
  address: {
    type: String,
    required: [true, "address is requied"],
  },
  country: {
    type: String,
    default: "Pakistan",
  },
});

module.exports = mongoose.model("user_details", userDetailSchema);
