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

route.post("/User", verifyTokenAdmin, postUser);
route.get("/User", getUser);
route.get("/User/:_id", verifyToken, getUserById);
route.put("/User/:_id", verifyToken, upload.single("pic"), putUser);
route.delete("/User/:_id", verifyToken, deleteUser);

module.exports = route;
