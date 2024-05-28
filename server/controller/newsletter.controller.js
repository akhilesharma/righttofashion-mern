const Newslatter = require("../models/Newslatter");
const { transporter } = require("../middleware/nodeMailer");

exports.postNewsletter = async (req, res) => {
  try {
    let data = new Newslatter(req.body);
    await data.save();
    let mailOption = {
      from: process.env.MAILSENDER,
      to: data.email,
      subject: "Your Email is Register With Us | team RightToFashion !!!",
      text: `Thanks To Subscribe Our Newslatter Service!\n Now We Send Email to You About Our Latest Product And Services | Team RightToFashon`,
    };
    transporter.sendMail(mailOption, (error, data) => {
      if (error) console.log(error);
    });
    res.send({
      result: "Done",
      message:
        "Thanks to Subscribe our Newslatter Service\nNow We Send Email regarding Latest Products and Offers!!!!",
    });
  } catch (error) {
    if (error.keyValue)
      res
        .status(400)
        .send({ result: "Fail", message: "Your Email Id Already Subscribed" });
    else if (error.errors.email)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.email.message });
    else
      res
        .status(500)
        .send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getAllNewLetter = async (req, res) => {
  try {
    const data = await Newslatter.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.deleteNewsletter = async (req, res) => {
  try {
    const data = await Newslatter.findOne({ _id: req.params._id });
    if (data) {
      await data.delete();
      res.send({ result: "Done", message: "Newslatter is deleted!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
