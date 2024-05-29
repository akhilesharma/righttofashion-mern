const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
dotenv.config();
require("./config/dbConnect");
const indexRoute = require("./route/index.route");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", indexRoute);
app.set(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));

// app.use(express.static("build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./build/index.html"));
// });

app.get("/", (req, res) => {
  res.send(`<h1>Righttofashion Api Working Perfect...</h1>`);
});

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is Running at PORT ${PORT}`));
