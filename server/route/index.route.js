const route = require("express").Router();

const maincategory = require("../route/maincategory.route");
const subcategory = require("../route/subcategory.route");
const brand = require("../route/brand.route");
const product = require("../route/product.route");
const user = require("../route/user.route");

route.use("/", maincategory);
route.use("/", subcategory);
route.use("/", brand);
route.use("/", product);
route.use("/", user);

module.exports = route;
