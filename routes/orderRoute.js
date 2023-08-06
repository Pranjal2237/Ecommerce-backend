const express = require("express");
const {
  newOrder,
  getSingleOrder,
  userOrder
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post("/order/new", isAuthenticatedUser, newOrder);

router.get("/order/:orderId/:productId", isAuthenticatedUser, getSingleOrder);

router.get("/orders", isAuthenticatedUser, userOrder);

module.exports = router;
