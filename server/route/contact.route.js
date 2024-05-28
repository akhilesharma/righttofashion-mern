const route = require("express").Router();

const {
  postContact,
  getContact,
  getContactById,
  putContact,
  deleteContact,
} = require("../controller/contact.controller");

const { verifyTokenAdmin } = require("../middleware/auth");

route.post("/contact", postContact);
route.get("/contact", verifyTokenAdmin, getContact);
route.get("/contact/:_id", verifyTokenAdmin, getContactById);
route.put("/contact/:_id", verifyTokenAdmin, putContact);
route.delete("/contact/:_id", verifyTokenAdmin, deleteContact);

module.exports = route;
