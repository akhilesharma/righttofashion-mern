const Maincategory = require("../models/Maincategory");

//api for maincategory

app.post("/maincategory", verifyTokenAdmin, async (req, res) => {
  try {
    const data = new Maincategory(req.body);
    await data.save();
    res.send({ result: "Done", message: "Maincategory is Created!!!!" });
  } catch (error) {
    if (error.keyValue)
      res
        .status(400)
        .send({ result: "Fail", message: "Maincategory Already Exist" });
    else if (error.errors.name)
      res
        .status(400)
        .send({ result: "Fail", message: error.errors.name.message });
    else
      res
        .status(500)
        .send({ result: "Fail", message: "Internal Server Error" });
  }
});
app.get("/maincategory", async (req, res) => {
  try {
    const data = await Maincategory.find();
    res.send({ result: "Done", data: data });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
});
app.get("/maincategory/:_id", verifyTokenAdmin, async (req, res) => {
  try {
    const data = await Maincategory.findOne({ _id: req.params._id });
    if (data) res.send({ result: "Done", data: data });
    else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
});
app.put("/maincategory/:_id", verifyTokenAdmin, async (req, res) => {
  try {
    const data = await Maincategory.findOne({ _id: req.params._id });
    if (data) {
      data.name = req.body.name;
      await data.save();
      res.send({ result: "Done", message: "Maincategory Updated!!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
});
app.delete("/maincategory/:_id", verifyTokenAdmin, async (req, res) => {
  try {
    const data = await Maincategory.findOne({ _id: req.params._id });
    if (data) {
      await data.delete();
      res.send({ result: "Done", message: "Maincategory is deleted!!!!" });
    } else res.status(404).send({ result: "Fail", message: "Invalid ID" });
  } catch (error) {
    res.status(500).send({ result: "Fail", message: "Internal Server Error" });
  }
});
