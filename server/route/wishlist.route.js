const route = require("express").Router();

const {
  postWishlist,
  getWishlistById,
  deleteWishlist,
} = require("../controller/wishlist.controller");

const { verifyToken } = require("../middleware/auth");

route.post("/wishlist", verifyToken, postWishlist);

route.get("/wishlist/:userid", verifyToken, getWishlistById);

route.delete("/wishlist/:_id", verifyToken, deleteWishlist);

module.exports = route;
