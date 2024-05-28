const Product = require("../models/Product");

exports.search = async (req, res) => {
  try {
    const data = await Product.find({
      $or: [
        { name: { $regex: `.*${req.body.search}.*`, $options: "i" } },
        { maincategory: { $regex: `.*${req.body.search}.*`, $options: "i" } },
        { subcategory: { $regex: `.*${req.body.search}.*`, $options: "i" } },
        { color: { $regex: `.*${req.body.search}.*`, $options: "i" } },
        { size: { $regex: `.*${req.body.search}.*`, $options: "i" } },
        { brand: { $regex: `.*${req.body.search}.*`, $options: "i" } },
        { description: { $regex: `.*${req.body.search}.*`, $options: "i" } },
      ],
    });
    res.status(400).send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
};
