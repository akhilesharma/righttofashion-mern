const Brand = require("../models/Brand");

//api for brand
exports.postBrand = async (req, res) => {
  try {
    const data = new Brand(req.body);
    await data.save();
    res.send({ result: "Done", message: "Brand is Created!!!!" });
  } catch (error) {
    // console.log(error)
    if (error.keyValue)
      res.status(400).send({ result: "Fail", message: "Brand Already Exist" });
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
exports.getBrand = async (req, res) => {
  try {
    const data = await Brand.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getBrandById = async (req, res) => {
  try {
    const data = await Brand.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.putBrand = async (req, res) => {
  try {
    const data = await Brand.findOne({ _id: req.params._id });
    if (data) {
      data.name = req.body.name;
      await data.save();
      res.send({ result: "Done", message: "Brand Updated!!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.deleteBrand = async (req, res) => {
  try {
    const data = await Brand.findOne({ _id: req.params._id });
    if (data) {
      await data.delete();
      res.send({ result: "Done", message: "Brand is deleted!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
