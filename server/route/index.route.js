const route = require("express").Router();

const maincategory = require("../route/maincategory.route");
const subcategory = require("../route/subcategory.route");
const brand = require("../route/brand.route");
const product = require("../route/product.route");
const user = require("../route/user.route");
const cart = require("../route/cart.route");
const wishlist = require("../route/wishlist.route");
const newsletter = require("../route/newsletter.route");
const contact = require("../route/contact.route");
const auth = require("../route/auth.route");
const checkout = require("../route/checkout.route");
const search = require("../route/search.route");

route.use("/", maincategory);
route.use("/", subcategory);
route.use("/", brand);
route.use("/", product);
route.use("/", user);
route.use("/", cart);
route.use("/", wishlist);
route.use("/", newsletter);
route.use("/", contact);
route.use("/", auth);
route.use("/", checkout);
route.use("/", search);

module.exports = route;
