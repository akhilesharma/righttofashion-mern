const route = require("express").Router();

const {
  postNewsletter,
  getAllNewLetter,
  deleteNewsletter,
} = require("../controller/newsletter.controller");

const { verifyTokenAdmin } = require("../middleware/auth");

route.post("/newslatter", postNewsletter);

route.get("/newslatter", verifyTokenAdmin, getAllNewLetter);

route.delete("/newslatter/:_id", verifyTokenAdmin, deleteNewsletter);

module.exports = route;
