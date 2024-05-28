const User = require("../models/User");
const bcrypt = require("bcrypt");
const { transporter } = require("../middleware/nodeMailer");
const { schema } = require("../middleware/passValidation");
const fs = require("fs");
exports.postUser = async (req, res) => {
  try {
    if (schema.validate(req.body.password)) {
      bcrypt.hash(req.body.password, 12, async function (err, hash) {
        const data = new User(req.body);
        data.password = hash;
        await data.save();
        let mailOption = {
          from: process.env.MAILSENDER,
          to: data.email,
          subject: "Your Account Is Created | Team RightToFashion !",
          text: `Thanks To Create Account With Us!\n Team RightToFashon`,
        };
        transporter.sendMail(mailOption, (error, data) => {
          if (error) console.log(error);
        });
        res.send({ result: "Done", message: "User is Created!!!!" });
      });
    } else
      res.send({
        result: "Fail",
        message:
          "Invalid Password\nPassword Length Must be Atleast 8 and Maximum 100, Must Contain Atleast 1 Upper Case Character, Atleast 1 Lowe Case Character, Does not Contain Space",
      });
  } catch (error) {
    if (error.keyValue)
      res
        .status(400)
        .send({ result: "Fail", message: "User Name Already Registered" });
    else if (error.errors.name)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.name.message });
    else if (error.errors.email)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.email.message });
    else if (error.errors.username)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.username.message });
    else if (error.errors.phone)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.phone.message });
    else if (error.errors.password)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.password.message });
    else
      res
        .status(500)
        .send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getUser = async (req, res) => {
  try {
    const data = await User.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getUserById = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.putUser = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) {
      data.name = req.body.name ? req.body.name : data.name;
      data.email = req.body.email ? req.body.email : data.email;
      data.phone = req.body.phone ? req.body.phone : data.phone;
      data.addressline1 = req.body.addressline1
        ? req.body.addressline1
        : data.addressline1;
      data.addressline2 = req.body.addressline2
        ? req.body.addressline2
        : data.addressline2;
      data.addressline3 = req.body.addressline3
        ? req.body.addressline3
        : data.addressline3;
      data.pin = req.body.pin ? req.body.pin : data.pin;
      data.city = req.body.city ? req.body.city : data.city;
      data.state = req.body.state ? req.body.state : data.state;

      if (req.file) {
        try {
          fs.unlinkSync(`./public/images/${data.pic}`);
        } catch (error) {}
        data.pic = req.file.filename ? req.file.filename : data.pic;
      }
      await data.save();
      res.send({ result: "Done", message: "User Updated!!!!!", data: data });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params._id });
    if (data) {
      await data.delete();
      res.send({ result: "Done", message: "User is deleted!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
