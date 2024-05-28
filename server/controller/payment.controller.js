const Checkout = require("../models/Checkout");
const Razorpay = require("razorpay");
const User = require("../models/User");

//Payment API
exports.Orders = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.rpkeyid,
      key_secret: process.env.secretkey,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

exports.Verify = async (req, res) => {
  try {
    var check = await Checkout.findOne({ _id: req.body.checkid });
    check.rppid = req.body.razorpay_payment_id;
    check.paymentstatus = "Done";
    check.mode = "Net Banking";
    await check.save();
    var user = await User.findOne({ _id: check.userid });
    let mailOption = {
      from: "vishankchauhan2@gmail.com",
      to: user.email,
      subject: "Payment Done !!! : Team FashionMart",
      text: `Thanks To Shopping With Us\nYour Payment Is Succesfully Confirm\nTrack Your Order In Profile Section!!!\nTeam RightToFashion`,
    };
    transporter.sendMail(mailOption, (error, data) => {
      if (error) console.log(error);
    });
    res.status(200).send({ result: "Done" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
