const Wishlist = require("../models/Wishlist");

exports.postWishlist = async (req, res) => {
  try {
    const data = new Wishlist(req.body);
    await data.save();
    res.send({ result: "Done", message: "Wishlist is Created!!!!" });
  } catch (error) {
    // console.log(error)
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
    else
      res
        .status(500)
        .send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.getWishlistById = async (req, res) => {
  try {
    const data = await Wishlist.find({ userid: req.params.userid });
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
exports.deleteWishlist = async (req, res) => {
  try {
    const data = await Wishlist.findOne({ _id: req.params._id });
    if (data) {
      await data.delete();
      res.send({ result: "Done", message: "Wishlist is deleted!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
