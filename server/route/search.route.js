const route = require("express").Router();

const { search } = require("../controller/search.controller");

route.post("/search", search);

module.exports = route;
