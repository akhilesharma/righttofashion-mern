const route = require("express").Router();

const {
  postSubcategory,
  getSubcategory,
  getSubcategoryById,
  putSubcategory,
  deleteSubcategory,
} = require("../controller/subcategory.controller");

const { verifyTokenAdmin } = require("../middleware/auth");

route.post("/Subcategory", verifyTokenAdmin, postSubcategory);
route.get("/Subcategory", getSubcategory);
route.get("/Subcategory/:_id", verifyTokenAdmin, getSubcategoryById);
route.put("/Subcategory/:_id", verifyTokenAdmin, putSubcategory);
route.delete("/Subcategory/:_id", verifyTokenAdmin, deleteSubcategory);

module.exports = route;
