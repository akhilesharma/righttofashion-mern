const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

mongoose
  .connect(`${DB_URI}/${DB_NAME}`)

  .then(() => console.log("database is connected..."))
  .catch((error) => console.log(error));
