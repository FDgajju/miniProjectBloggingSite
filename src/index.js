const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const route = require("./routes/route.js");

const app = express();

//middleWares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", route);

module.exports = app;
