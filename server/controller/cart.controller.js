const Cart = require("../models/Cart");

exports.addCart = async (req, res) => {
  try {
    const data = new Cart(req.body);
    await data.save();
    res.send({ result: "Done", message: "Cart is Created!!!!" });
  } catch (error) {
    console.log(error);
    if (error.errors.userid)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.userid.message });
    else if (error.errors.productid)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.productid.message });
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
    else
      res
        .status(500)
        .send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getAllCart = async (req, res) => {
  try {
    const data = await Cart.find({ userid: req.params.userid });
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getCartById = async (req, res) => {
  try {
    const data = await Cart.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.updateCart = async (req, res) => {
  try {
    const data = await Cart.findOne({ _id: req.params._id });
    if (data) {
      data.qty = req.body.qty;
      data.total = req.body.total;
      await data.save();
      res.send({ result: "Done", message: "Cart Updated!!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.deleteCart = async (req, res) => {
  try {
    const data = await Cart.findOne({ _id: req.params._id });
    if (data) {
      await data.delete();
      res.send({ result: "Done", message: "Cart is deleted!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.deleteAllCart = async (req, res) => {
  try {
    const data = await Cart.deleteMany({ userid: req.params.userid });
    res.send({ result: "Done", message: "All Carts Are deleted!!!!" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
