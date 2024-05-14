const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/righttofashion")

  .then(() => console.log("database is connected..."))
  .catch((error) => console.log(error));
