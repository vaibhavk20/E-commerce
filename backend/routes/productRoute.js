const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails
} = require("../controllers/productController");

const productRouter = express.Router();

productRouter.post("/add", createProduct);

productRouter.get("/", getAllProducts);
productRouter.patch("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/details/:id",getProductDetails)

module.exports = { productRouter };
