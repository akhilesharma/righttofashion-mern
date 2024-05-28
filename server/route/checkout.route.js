const route = require("express").Router();

const {
  postCheckout,
  getCheckout,
  getCheckoutuserId,
  getCheckoutById,
  putCheckout,
} = require("../controller/checkout.controller");

const { verifyToken, verifyTokenAdmin } = require("../middleware/auth");

route.post("/checkout", verifyToken, postCheckout);
route.get("/checkout", verifyTokenAdmin, getCheckout);
route.get("/checkoutUser/:userid", verifyToken, getCheckoutuserId);
route.get("/checkout/:_id", verifyToken, getCheckoutById);
route.put("/checkout/:_id", verifyTokenAdmin, putCheckout);

module.exports = route;
