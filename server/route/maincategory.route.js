const route = require("express").Router();

const {
  postMaincategory,
  getMaincategory,
  getMaincategoryById,
  putMaincategory,
  deleteMaincategory,
} = require("../controller/maincategory.controller");

const { verifyTokenAdmin } = require("../middleware/auth");

route.post("/maincategory", verifyTokenAdmin, postMaincategory);
route.get("/maincategory", getMaincategory);
route.get("/maincategory/:_id", verifyTokenAdmin, getMaincategoryById);
route.put("/maincategory/:_id", verifyTokenAdmin, putMaincategory);
route.delete("/maincategory/:_id", verifyTokenAdmin, deleteMaincategory);

module.exports = route;
