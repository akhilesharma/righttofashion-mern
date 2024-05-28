const User = require("../models/User");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { transporter } = require("../middleware/nodeMailer");
const { schema } = require("../middleware/passValidation");
exports.login = async (req, res) => {
  try {
    const data = await User.findOne({ username: req.body.username });
    if (data) {
      if (await bcrypt.compare(req.body.password, data.password)) {
        jsonwebtoken.sign(
          { data },
          process.env.JSONSALTKEY,
          async (error, token) => {
            if (error) {
              console.log(error);
              res
                .status(500)
                .send({ result: "Fail", message: "internal server error" });
            } else {
              if (data.tokens.length < 3) {
                data.tokens.push(token);
                await data.save();
                res.send({ result: "Done", data: data, token: token });
              } else
                res.status(400).send({
                  result: "fail",
                  message:
                    "you already logged in from 3 device!!! to login on the device please logout from other devices",
                });
            }
          }
        );
      } else
        res
          .status(400)
          .send({ result: "Fail", message: "Username or Password incorrect" });
    } else
      res
        .status(400)
        .send({ result: "Fail", message: "Username or Password incorrect" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
//API for Logout...........................................
exports.logout = async (req, res) => {
  try {
    const data = await User.findOne({ username: req.body.username });
    if (data) {
      let index = data.tokens.findIndex((item) => item == req.body.token);
      if (index !== -1) {
        data.tokens.splice(index, 1);
        await data.save();
      }
    }
    res.status(500).send({ result: "Done", message: "you logged out!!!" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
//API for Logout from other device..........
exports.logoutAll = async (req, res) => {
  try {
    const data = await User.findOne({ username: req.body.username });
    if (data) {
      let index = data.tokens.findIndex((item) => item == req.body.token);
      if (index !== -1) {
        data.tokens = [];
        await data.save();
      }
    }
    res.status(500).send({
      result: "Done",
      message: "you logged out from all other device!!!",
    });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};

exports.resetPasswordUsername = async (req, res) => {
  try {
    console.log(req.body.username);
    let data = await User.findOne({ username: req.body.username });
    if (data) {
      let num = parseInt(Math.floor(100000 + Math.random() * 900000));
      data.otp = num;
      await data.save();
      let mailOption = {
        from: process.env.MAILSENDER,
        to: data.email,
        subject: "OTP for password reset | team RightToFashion !!!",
        text: `OTP for password reset is ${num}!!!!\n Team RightToFashon`,
      };
      transporter.sendMail(mailOption, (error, data) => {
        if (error) console.log(error);
      });
      res.send({
        result: "Done",
        message: "OTP is sent to your register Email Id",
      });
    } else
      res.status(404).send({ result: "fail", message: "Invalid username" });
  } catch (error) {
    res.status(500).send({ result: "fail", message: "internal server error" });
  }
};

exports.resetPasswordOtp = async (req, res) => {
  try {
    let data = await User.findOne({ username: req.body.username });
    if (data) {
      if (data.otp === req.body.otp) {
        res.send({ result: "Done" });
      } else res.status(404).send({ result: "fail", message: "Invalid otp" });
    } else
      res.status(404).send({ result: "fail", message: "Invalid username" });
  } catch (error) {
    console.log(error);
    res.send({ result: "fail", message: "internal server error" });
  }
};
exports.resetPasswordPassword = async (req, res) => {
  try {
    let data = await User.findOne({ username: req.body.username });
    if (data) {
      if (data.otp === req.body.otp) {
        if (schema.validate(req.body.password)) {
          bcrypt.hash(req.body.password, 12, async function (err, hash) {
            data.password = hash;
            await data.save();
            res.send({ result: "Done", message: "password has been reset!!!" });
          });
        } else
          res.send({
            result: "Fail",
            message:
              "Invalid Password\nPassword Length Must be Atleast 8 and Maximum 100, Must Contain Atleast 1 Upper Case Character, Atleast 1 Lowe Case Character, Does not Contain Space",
          });
      } else res.status(500).send({ result: "Fail", message: "Invalid otp" });
    } else
      res.status(404).send({ result: "fail", message: "Invalid username" });
  } catch (error) {
    res.status(500).send({ result: "fail", message: "internal server error" });
  }
};
