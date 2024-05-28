const route = require("express").Router();

const {
  login,
  logout,
  logoutAll,
  resetPasswordUsername,
  resetPasswordOtp,
  resetPasswordPassword,
} = require("../controller/auth.controller");

route.post("/login", login);
route.post("/logout", logout);
route.post("/logoutAll", logoutAll);
//

route.post("/reset-password-username", resetPasswordUsername);
route.post("/reset-password-otp", resetPasswordOtp);
route.post("/resetpassword-password", resetPasswordPassword);

module.exports = route;
