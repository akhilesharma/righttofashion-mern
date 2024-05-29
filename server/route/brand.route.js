const route = require("express").Router();

const {
  postBrand,
  getBrand,
  getBrandById,
  putBrand,
  deleteBrand,
} = require("../controller/brand.controller");

const { verifyTokenAdmin } = require("../middleware/auth");

route.post("/Brand", verifyTokenAdmin, postBrand);
route.get("/Brand", getBrand);
route.get("/Brand/:_id", verifyTokenAdmin, getBrandById);
route.put("/Brand/:_id", verifyTokenAdmin, putBrand);
route.delete("/Brand/:_id", verifyTokenAdmin, deleteBrand);

module.exports = route;
