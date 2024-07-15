require("dotenv").config();
require("express-async-errors");
const express = require("express");
const dbConfig = require("./db/dbConfig");
const productCategoryRouter = require("./routes/product_category_route");
const productRouter = require("./routes/product_route");
const errorHandler = require("./middlewares/GlobalErrorHandler");
const app = express();

// --middlewares
app.use(express.json());
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", productCategoryRouter);

// --global error handler
app.use(errorHandler);

/* connection*/
const port = 8080;
const connect = async () => {
  try {
    await dbConfig(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("app is listening to the port", port);
    });
  } catch (error) {
    throw new Error("mongoose throw connection error ->", error);
  }
};
connect();
