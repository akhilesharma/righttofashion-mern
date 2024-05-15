const Product = require("../models/Product");

const fs = require("fs");

//api for Product
exports.postProduct = async (req, res) => {
  try {
    const data = new Product(req.body);
    if (req.files.pic1) {
      data.pic1 = req.files.pic1[0].filename;
    }
    if (req.files.pic2) {
      data.pic2 = req.files.pic2[0].filename;
    }
    if (req.files.pic3) {
      data.pic3 = req.files.pic3[0].filename;
    }
    if (req.files.pic4) {
      data.pic4 = req.files.pic4[0].filename;
    }
    await data.save();
    res.send({ result: "Done", message: "Product is Created!!!!" });
  } catch (error) {
    if (error.errors.name)
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
    else if (error.errors.baseprice)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.baseprice.message });
    else if (error.errors.finalprice)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.finalprice.message });
    else
      res
        .status(500)
        .send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const data = await Product.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.putProduct = async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params._id });
    if (data) {
      data.name = req.body.name ?? data.name;
      data.maincategory = req.body.maincategory ?? data.maincategory;
      data.subcategory = req.body.subcategory ?? data.subcategory;
      data.brand = req.body.brand ?? data.brand;
      data.color = req.body.color ?? data.color;
      data.size = req.body.size ?? data.size;
      data.baseprice = req.body.baseprice ?? data.baseprice;
      data.discount = req.body.discount ?? data.discount;
      data.finalprice = req.body.finalprice ?? data.finalprice;
      data.stock = req.body.stock ?? data.stock;
      data.description = req.body.description ?? data.description;
      if (req.files.pic1) {
        try {
          fs.unlinkSync(`./public/images/${data.pic1}`);
        } catch (error) {}
        data.pic1 = req.files.pic1[0].filename;
      }
      if (req.files.pic2) {
        try {
          fs.unlinkSync(`./public/images/${data.pic2}`);
        } catch (error) {}
        data.pic2 = req.files.pic2[0].filename;
      }
      if (req.files.pic3) {
        try {
          fs.unlinkSync(`./public/images/${data.pic3}`);
        } catch (error) {}
        data.pic3 = req.files.pic3[0].filename;
      }
      if (req.files.pic4) {
        try {
          fs.unlinkSync(`./public/images/${data.pic4}`);
        } catch (error) {}
        data.pic4 = req.files.pic4[0].filename;
      }
      await data.save();
      res.send({ result: "Done", message: "Product Updated!!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
    console.log(error);
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const data = await Product.findOne({ _id: req.params._id });
    if (data) {
      await data.delete();
      res.send({ result: "Done", message: "Product is deleted!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
