const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'/../public');
const port= process.env.PORT || 3000;
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket) =>{
  console.log("New user connects");

  socket.on('disconnect', () =>{
    console.log("User was disconnected");
  })
});

server.listen(port, () =>{
  console.log(`Server is up on ${port}`);
});
console.log(publicPath);
