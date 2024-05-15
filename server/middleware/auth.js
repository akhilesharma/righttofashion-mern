const User = require("./models/User");

async function verifyTokenAdmin(req, res, next) {
  var token = req.headers["authorization"];
  var username = req.headers["username"];
  if (token) {
    let user = await User.findOne({ username: username });
    if (user && user.tokens.findIndex((item) => item === token) !== -1) {
      jsonwebtoken.verify(token, JSONSALTKEY, (error, data) => {
        if (error) {
          res.send({
            result: "fail",
            message: "you are not authorized to access the data",
          });
        } else {
          if (user.role === "Admin") next();
          else
            res.send({
              result: "fail",
              message: "you are not authorized to perform this action",
            });
        }
      });
    } else
      res.send({
        result: "fail",
        message: "you are currently logged out... please login again",
      });
  } else
    res.send({
      result: "fail",
      message: "you are not authorized to access the data",
    });
}
async function verifyToken(req, res, next) {
  var token = req.headers["authorization"];
  var role = req.headers["role"];
  var username = req.headers["username"];

  if (token) {
    let user = await User.findOne({ username: username });
    if (user && user.tokens.findIndex((item) => item === token) !== -1) {
      jsonwebtoken.verify(token, JSONSALTKEY, (error, data) => {
        if (error) {
          res.send({
            result: "fail",
            message: "you are not authorized to perform this action",
          });
        } else {
          // let user=User.findOne({username:username})
          next();
        }
      });
    } else
      res.send({
        result: "fail",
        message: "you are currently logged out... please login again",
      });
  } else
    res.send({
      result: "fail",
      message: "you are not authorized to access the data",
    });
}

module.exports = {
  verifyTokenAdmin,
  verifyToken,
};
