var socket = io();

socket.on('connect',() => {
  console.log("Connected to server");
});

socket.on('disconnect',()=> {
    console.log("disConnected to server");
});
socket.on('newMsg',function(msg){
  console.log("new message",msg );
  var li = $('<li> </li>');
  li.text(`${msg.from}:${msg.text}`);
  $('#messages').append(li);
});


$(document).on('submit', function(e){
  e.preventDefault();
  socket.emit('createMsg', {
    from: 'User',
  text: $('#message').val()
   },
  function (data){


  });

});
