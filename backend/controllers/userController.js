const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { ErrorHandler } = require("../utils/errorhandler");
const { User } = require("../models/user.model");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = new User({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepicurl",
    },
  });

  await user.save()

  res.status(201).json({
    success: true,
    user,
  });
});

