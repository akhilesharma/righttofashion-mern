const Checkout = require("../models/Checkout");
const User = require("../models/User");
const { transporter } = require("../middleware/nodeMailer");

exports.postCheckout = async (req, res) => {
  try {
    const data = new Checkout(req.body);
    await data.save();
    var user = await User.findOne({ _id: data.userid });
    let mailOption = {
      from: process.env.MAILSENDER,
      to: user.email,
      subject: "Your Order Is Placed! | team RightToFashion !!!",
      text: `Thanks To Place Order!\n You Can Track Your Order In Profile Section! | Team RightToFashon`,
    };
    transporter.sendMail(mailOption, (error, data) => {
      if (error) console.log(error);
    });
    res.send({
      result: "Done",
      message: "Checkout is Created!!!!",
      data: data,
    });
  } catch (error) {
    // console.log(error)
    if (error.errors.userid)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.userid.message });
    else if (error.errors.totalprice)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.totalprice.message });
    else if (error.errors.shippingamount)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.shippingamount.message });
    else if (error.errors.finalamount)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.finalamount.message });
    else if (error.errors.name)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.name.message });
    else if (error.errors.maincategory)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.maincategory.message });
    else if (error.errors.subcategory)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.subcategory.message });
    else if (error.errors.brand)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.brand.message });
    else if (error.errors.color)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.color.message });
    else if (error.errors.size)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.size.message });
    else if (error.errors.price)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.price.message });
    else if (error.errors.total)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.total.message });
    else if (error.errors.productid)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.productid.message });
    else
      res
        .status(500)
        .send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getCheckout = async (req, res) => {
  try {
    const data = await Checkout.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getCheckoutuserId = async (req, res) => {
  try {
    const data = await Checkout.find({ userid: req.params.userid });
    if (data) res.send({ result: "Done", data: data });
    else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getCheckoutById = async (req, res) => {
  try {
    const data = await Checkout.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.putCheckout = async (req, res) => {
  try {
    const data = await Checkout.findOne({ _id: req.params._id });
    if (data) {
      data.mode = req.body.mode ?? data.mode;
      data.status = req.body.status ?? data.status;
      data.paymentstatus = req.body.paymentstatus ?? data.paymentstatus;
      data.rppid = req.body.rppid ?? data.rppid;
      await data.save();
      res.send({ result: "Done", message: "Checkout Updated!!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
