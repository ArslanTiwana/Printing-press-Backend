const app = require("./src/index");
const express = require("express");
var path = require('path');
const { join } = require('path');


// app.use(express.static(__dirname + "/public"));
app.use(express.static(join(__dirname, 'public')));

const port = process.env.PORT || 3001;
// This will start the express server on defined port
const server=app.listen(port, () => {
  console.log(`Video app listening at http://localhost:${process.env.PORT}`);
});


 