const product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorHandler");
const { userDetails } = require("./userController");

// Get All Product
exports.getAllProducts = async (req, res) => {
  try {
    const resultPerPage = 8;
    const countProduct = await product.countDocuments();
    const apifeatures = new ApiFeatures(product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    const products = await apifeatures.query;
    res.status(200).cookie("check", "cookie checked").json({
      success: true,
      products,
      countProduct,
    });
  } catch (err) {
    console.log(err);
  }
};

//Get Single Product
exports.singleProduct = async (req, res, next) => {
  try {
    const pro = await product.findById(req.params.id);
    console.log(pro);
    if (!pro) {
      next(new ErrorHandler("Product Not Found", 404));
    } else {
      res.status(200).json({
        success: true,
        pro,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//Create New Review or Update the Review

exports.productReview = async (req, res, next) => {
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };

  const pro = await product.findById(req.params.id);

  let isReviewed = false;

  pro.reviews.forEach((key) => {
    if (review.user.toString() === key.user.toString()) {
      isReviewed = true;
    }
  });

  if (isReviewed) {
    // let store={}
    // let index;
    // let count=-1;
    pro.reviews.forEach((key) => {
      // count=count+1;
      if (review.user.toString() === key.user.toString()) {
        // index=count;
        key.rating = review.rating;
        key.comment = review.comment;
        // store={...key}
      }
    });
    // pro.reviews.slice(0,index-1,index+1);
    // pro.reviews.unshift(store);
  } else {
    pro.reviews.unshift(review);
  }

  let countpro = 0;

  pro.reviews.forEach((rev) => {
    countpro = countpro + rev.rating;
  });

  pro.rating = countpro / pro.reviews.length;

  await pro.save();

  res.status(200).json({
    success: true,
    review,
    ratings: pro.rating,
    pro,
  });
};

//Get All Review

exports.getAllRiview = async (req, res, next) => {
  const Product = await product.findById(req.params.id);

  if (!Product) {
    return next(new ErrorHandler("Product Not Found", 400));
  }

  res.status(200).json({
    success: true,
    reviews: Product.reviews,
  });
};
