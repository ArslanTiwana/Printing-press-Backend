require("dotenv").config();
const express = require("express");
const router = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());

// Parsers to parse the Applications
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// folder to upload files
app.use(express.static(__dirname + "/public"));

// All the routes are defiend in Routes directory
app.use("/api", router);

module.exports = app;
