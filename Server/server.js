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
// A message sent to display for evry one
socket.emit('newMsg',{
  from:'Admin',
  text:'Welcome to chat Room',
  createdAt : new Date().getTime()
});

//A message sent for diplay to others
socket.broadcast.emit('newMsg',{
    from:"Admin",
    text :"new user joined",
    createdAt : new Date().getTime()
 });

socket.on('createMsg',(message) =>{
  console.log('create message',message);
 io.emit('newMsg',{
    from: message.from,
   text:message.text,
    createdAt : new Date().getTime()
  });
//socket.broadcast.emit('newMsg',{
    //from: message.from,
    //text:message.text,
    //createdAt : new Date().getTime()
 //});

 socket.on('disconnect', () =>{
   console.log("User was disconnected");
 });
});


});

server.listen(port, () =>{
  console.log(`Server is up on ${port}`);
});
console.log(publicPath);
