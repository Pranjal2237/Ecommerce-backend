const express = require("express");
const {
  createUser,
  loginUser,
  logout,
  userDetails,
  updatePassowrd,
  updateProfile,
  newCart,
  deleteCart,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.post("/ragister", createUser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.get("/user", isAuthenticatedUser, userDetails);

router.post("/password/update", isAuthenticatedUser, updatePassowrd);

router.post("/user/update", isAuthenticatedUser, updateProfile);

router.post("/cart/new/:id", isAuthenticatedUser, newCart);

router.delete("/user/cart/:id", isAuthenticatedUser, deleteCart);

module.exports = router;
