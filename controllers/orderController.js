const ErrorHandler = require("../utils/errorHandler");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//Create New Order

exports.newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
};

//Get Single Order

exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.orderId).populate(
    "user",
    "name email"
  ); //populate is used to get user name and email by unsing user id.

  if (!order) {
    return next(new ErrorHandler("Order dose not exist", 400));
  }

  const product = order.orderItems.filter(
    (item) => item._id.toString() === req.params.productId.toString()
  );

  if (!product) {
    return next(new ErrorHandler("product dose not exist", 400));
  }

  const otherProducts = order.orderItems.filter(
    (item) => item._id.toString() !== req.params.productId.toString()
  );

  res.status(200).json({
    success: true,
    product,
    otherProducts,
    order,
  });
};

//Get logged in User Order

exports.userOrder = async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    return next(new ErrorHandler("No Oder Found", 400));
  }

  res.status(200).json({
    success: true,
    order,
  });
};
