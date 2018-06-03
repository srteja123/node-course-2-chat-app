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

socket.on('newLocMsg',function(msg){
  var li = $('<li> </li>');
  var a = $('<a target="_blank">My current Location</a>');
  li.text(`${msg.from}:`);
  a.attr('href',msg.url);
  li.append(a);
  $('#messages').append(li);
});


$(document).on('submit','#message-form', function(e){
  e.preventDefault();
  socket.emit('createMsg', {
    from: 'User',
  text: $('#message').val()
   },
  function (data){


  });

});


$(document).on('click','#send-location',function(){
  if (!navigator.geolocation) {
    return alert('Geo location not supported by browser');

  }
  navigator.geolocation.getCurrentPosition(function(pos){
console.log(pos);
socket.emit('createLocMsg',{
  latitude:pos.coords.latitude,
  longitude:pos.coords.longitude
});

  },function() {
alert("Unable to print location");
  }

  );
  console.log("button clicked");
});
