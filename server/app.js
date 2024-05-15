const express = require("express");
require("./dbConnect");
const indexRoute = require("./route/index.route");
const app = express();

app.use(express.json());

app.use("/", indexRoute);

app.listen(8000, console.log("server is running at port 8000"));
