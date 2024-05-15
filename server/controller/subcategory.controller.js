const Subcategory = require("../models/subcategory");

//api for subcategory

exports.postSubcategory = async (req, res) => {
  try {
    const data = new Subcategory(req.body);
    await data.save();
    res.send({ result: "Done", message: "Subcategory is Created!!!!" });
  } catch (error) {
    if (error.keyValue)
      res
        .status(400)
        .send({ result: "Fail", message: "Subcategory Already Exist" });
    else if (error.errors.name)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.name.message });
    else
      res
        .status(500)
        .send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getSubcategory = async (req, res) => {
  try {
    const data = await Subcategory.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getSubcategoryById = async (req, res) => {
  try {
    const data = await Subcategory.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.putSubcategory = async (req, res) => {
  try {
    const data = await Subcategory.findOne({ _id: req.params._id });
    if (data) {
      data.name = req.body.name;
      await data.save();
      res.send({ result: "Done", message: "Subcategory Updated!!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.deleteSubcategory = async (req, res) => {
  try {
    const data = await Subcategory.findOne({ _id: req.params._id });
    if (data) {
      await data.delete();
      res.send({ result: "Done", message: "Subcategory is deleted!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
