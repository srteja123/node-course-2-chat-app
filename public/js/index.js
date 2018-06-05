var socket = io();

socket.on('connect',() => {
  console.log("Connected to server");
});

socket.on('disconnect',()=> {
    console.log("disConnected to server");
});
socket.on('newMsg',function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    text:msg.text,
    from: msg.from,
    createAt : formattedTime
  });
  $('#messages').append(html);
 //
//  var li = $('<li> </li>');
  //li.text(`${msg.from}:${formattedTime}:${msg.text}`);
  //$('#messages').append(li);
});

socket.on('newLocMsg',function(msg){

  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    from: msg.from,
    url: msg.url,
    createAt : formattedTime
  });
  $('#messages').append(html);


//  var formattedTime = moment(msg.createdAt).format('h:mm a');
//  var li = $('<li> </li>');
  //var a = $('<a target="_blank">My current Location</a>');
//  li.text(`${msg.from}: ${formattedTime}`);
  //a.attr('href',msg.url);
//li.append(a);
//  $('#messages').append(li);
});


$(document).on('submit','#message-form', function(e){
  e.preventDefault();

  socket.emit('createMsg', {
    from: 'User',
  text: $('#message').val()
   },
  function (){

$('#message').val('');
  });

});


$(document).on('click','#send-location',function(){
  if (!navigator.geolocation) {
    return alert('Geo location not supported by browser');

  }
  $('#send-location').attr('disabled','disabled').text('Sending location....');
  navigator.geolocation.getCurrentPosition(function(pos){
 $('#send-location').removeAttr('disabled').text('Send location');
socket.emit('createLocMsg',{
  latitude:pos.coords.latitude,
  longitude:pos.coords.longitude
});

  },function() {
    $('#send-location').removeAttr('disabled').text('Send location');
alert("Unable to print location");
  }

  );
  console.log("button clicked");
});
