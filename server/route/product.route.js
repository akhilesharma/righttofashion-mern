const route = require("express").Router();
const { upload } = require("../middleware/uploadMulter");
const {
  postProduct,
  getProduct,
  getProductById,
  putProduct,
  deleteProduct,
} = require("../controller/product.controller");

const { verifyTokenAdmin } = require("../middleware/auth");

route.post(
  "/Product",
  verifyTokenAdmin,
  upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 },
  ]),
  postProduct
);
route.get("/Product", getProduct);
route.get("/Product/:_id", getProductById);
route.put(
  "/Product/:_id",
  verifyTokenAdmin,
  upload.fields([
    { name: "pic1", maxCount: 1 },
    { name: "pic2", maxCount: 1 },
    { name: "pic3", maxCount: 1 },
    { name: "pic4", maxCount: 1 },
  ]),
  putProduct
);
route.delete("/Product/:_id", verifyTokenAdmin, deleteProduct);

module.exports = route;
