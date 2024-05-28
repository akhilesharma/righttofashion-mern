const Contact = require("../models/Brand");
const { transporter } = require("../middleware/nodeMailer");
//api for Contact

exports.postContact = async (req, res) => {
  try {
    const data = new Contact(req.body);
    await data.save();
    let mailOption = {
      from: process.env.MAILSENDER,
      to: data.email,
      subject: "Your Query Received! | team RightToFashion",
      text: `Thanks To Share Your Query With Us.\n You Team Will Contact You Soon! | Team RightToFashon`,
    };
    transporter.sendMail(mailOption, (error, data) => {
      if (error) console.log(error);
    });
    res.send({ result: "Done", message: "Contact is Created!!!!" });
  } catch (error) {
    // console.log(error)
    if (error.errors.name)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.name.message });
    else if (error.errors.email)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.email.message });
    else if (error.errors.subject)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.subject.message });
    else if (error.errors.message)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.message.message });
    else if (error.errors.phone)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.phone.message });
    else
      res
        .status(500)
        .send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getContact = async (req, res) => {
  try {
    const data = await Contact.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getContactById = async (req, res) => {
  try {
    const data = await Contact.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.putContact = async (req, res) => {
  try {
    const data = await Contact.findOne({ _id: req.params._id });
    if (data) {
      data.status = req.body.status;
      await data.save();
      res.send({ result: "Done", message: "Contact Updated!!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    //   console.log(error);
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.deleteContact = async (req, res) => {
  try {
    const data = await Contact.findOne({ _id: req.params._id });
    if (data) {
      await data.delete();
      res.send({ result: "Done", message: "Contact is deleted!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
