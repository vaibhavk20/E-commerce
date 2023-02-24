const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { ProductModel } = require("../models/product.model");
const ApiFeatures = require("../utils/apiFeatures");
const { ErrorHandler } = require("../utils/errorhandler");

// create product
const createProduct = catchAsyncErrors(async (req, res) => {
  const payload = req.body;

  const product = new ProductModel(payload);
  await product.save();

  res.status(201).json({
    success: true,
    product,
  });
});

// get all products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeature = new ApiFeatures(ProductModel.find(), req.query).search().filter();
  
  const products = await apiFeature.query;
  // const products = await ProductModel.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// update product  Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const ID = req.params.id;
  const product = await ProductModel.findOne({ _id: ID });
  if (!product) {
    res.status(500).json({
      success: false,
      message: "Product id not exist",
    });
  } else {
    const payload = req.body;
    await ProductModel.findByIdAndUpdate({ _id: ID }, payload);
    res.status(200).json({
      success: true,
      message: "Updated Successfully",
    });
  }
});

// delete product admin
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const ID = req.params.id;
  const product = await ProductModel.findOne({ _id: ID });
  console.log(product);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "product not found",
    });
  } else {
    await ProductModel.findByIdAndRemove({ _id: ID });
    res.status(200).json({
      success: true,
      message: "deleted Successfully",
    });
  }
});

// get product details
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const Id = req.params.id;
  const product = await ProductModel.findById({ _id: Id });

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    // res.status(500).json({
    //   success: false,
    //   message: "Product is not found",
    // });

    // next(new ErrorHandler("Product not found", 404));
  } else {
    return res.status(200).json({
      success: true,
      product,
    });
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
};
