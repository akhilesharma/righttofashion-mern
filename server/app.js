const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
require("./dbConnect");
const indexRoute = require("./route/index.route");
dotenv.config();
const app = express();
app.use(express.json());
app.use("/", indexRoute);
app.set(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));

// app.use(express.static("build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./build/index.html"));
// });

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is Running at PORT ${PORT}`));
