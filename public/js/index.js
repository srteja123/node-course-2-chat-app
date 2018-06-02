var socket = io();
socket.on('connect',() => {
  console.log("Connected to server");
  socket.emit('createMsg',{
    from:"simple@dimple.com",
    text:"Welcome back"
  });
});

socket.on('disconnect',()=> {
    console.log("disConnected to server");
});
socket.on('newMsg',function(msg){
  console.log("new message",msg );
});
