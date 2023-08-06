const express = require("express");
const {
  newWishList,
  getWishListProducts,
  removeWishListProduct,
} = require("../controllers/wishListController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.post("/wishlist/:id", isAuthenticatedUser, newWishList);

router.get("/wishlist", isAuthenticatedUser, getWishListProducts);

router.delete("/user/wishlist/:id", isAuthenticatedUser, removeWishListProduct);

module.exports = router;
