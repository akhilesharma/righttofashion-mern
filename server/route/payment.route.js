const route = require("express").Router();
const { verifyToken } = require("../middleware/auth");
const { Orders, Verify } = require("../controller/user.controller");

route.post("/orders", verifyToken, Orders);
route.put("/verify", verifyToken, Verify);

module.exports = route;
