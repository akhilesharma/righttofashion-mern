const route = require("express").Router();

const {
  addCart,
  getAllCart,
  getCartById,
  updateCart,
  deleteCart,
  deleteAllCart,
} = require("../controller/cart.controller");

const { verifyToken } = require("../middleware/auth");

route.post("/cart", verifyToken, addCart);
route.get("/cartAll/:userid", verifyToken, getAllCart);
route.get("/cart/:_id", verifyToken, getCartById);
route.put("/cart/:_id", verifyToken, updateCart);
route.delete("/cart/:_id", verifyToken, deleteCart);
route.delete("/cartAll/:userid", verifyToken, deleteAllCart);

module.exports = route;
