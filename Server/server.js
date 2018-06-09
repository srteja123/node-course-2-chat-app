const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'/../public');
const port= process.env.PORT || 3000;
const socketIO = require('socket.io');
const http = require('http');
const {isRealString} = require('./Utils/validation.js');
const {Users} = require('./Utils/users');
const{generateMsg,generateLocMsg}=  require('./Utils/message');
var users = new Users();
var app = express();
var server = http.createServer(app);

var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket) =>{
  console.log("New user connects");
// A message sent to display for evry one

 socket.on('join',(params,callback) =>{

   if(!isRealString(params.name) || !isRealString(params.room)){
    return  callback('Name and room name are required');
   }
   socket.join(params.room);
   users.removeUser(socket.id);
   users.addUser(socket.id,params.name,params.room);
   io.to(params.room).emit('UpdatedUserList',users.getUserList(params.room));
   //socket.leave('The office bunch');

   //io.emit --> io.to('The office bunch').emit
   //socket.broadcast.emit --> socket.broadcast.to('The office bunch').emit
   //socket.emit
   socket.emit('newMsg',generateMsg(
     'Admin',
     'Welcome to chat Room'
   ));

   //A message sent for diplay to others
   socket.broadcast.to(params.room).emit('newMsg',generateMsg(
       "Admin",
       `${params.name} has joined`
    ));

callback();
 });

socket.on('createMsg',(message,callback) =>{
  var user = users.getUser(socket.id);
  if(user && isRealString(message.text)){
    io.to(user.room).emit('newMsg',generateMsg(
        user.name,
      message.text
    ));
  }

 callback('This is from sever');
 });

 socket.on('createLocMsg',(coords) =>{
   var user = users.getUser(socket.id);
     if(user){
   io.emit('newLocMsg',generateLocMsg(user.name,coords.latitude,coords.longitude))
  }
 });



 socket.on('disconnect', () =>{
   console.log("User was disconnected");
   var user = users.removeUser(socket.id);
   if(user){
io.to(user.room).emit('UpdatedUserList',users.getUserList(user.room));
io.to(user.room).emit('newMsg',generateMsg(`Admin ${user.name} has left`));

   }

});


});

server.listen(port, () =>{
  console.log(`Server is up on ${port}`);
});
console.log(publicPath);
