const express = require("express");
const {
  getAllProducts,
  singleProduct,
  productReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/product/:id", singleProduct);

router.post("/product/:id", isAuthenticatedUser, productReview);

module.exports = router;
