const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./index");

dotenv.config({ path: `${__dirname}/../config.env` });

//mongodb connection
const DB = process.env.DATABASE || "mongodb://localhost:27017/Blogging";
mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log("mongodb running and connected"))
  .catch((err) => console.log(err));

//express connection
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
