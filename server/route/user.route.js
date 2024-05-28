const route = require("express").Router();
const { upload } = require("../middleware/uploadMulter");
const {
  postUser,
  getUser,
  getUserById,
  putUser,
  deleteUser,
} = require("../controller/user.controller");

const { verifyTokenAdmin, verifyToken } = require("../middleware/auth");

route.post("/user", postUser);
route.get("/user", verifyTokenAdmin, getUser);
route.get("/user/:_id", verifyToken, getUserById);
route.put("/user/:_id", verifyToken, upload.single("pic"), putUser);
route.delete("/user/:_id", verifyToken, deleteUser);

module.exports = route;
