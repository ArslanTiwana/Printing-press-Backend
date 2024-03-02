const app = require("./src/index");
const express = require("express");
var path = require('path');
const { join } = require('path');
const { initializeSocket } = require('./src/utils/WebSocket/index');
const http = require('http');
const server = http.createServer(app);
initializeSocket(server);


// app.use(express.static(__dirname + "/public"));
app.use(express.static(join(__dirname, 'public')));

const port = process.env.PORT || 3001;
// This will start the express server on defined port
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



 