var socket = io();

socket.on('connect', function () {

  console.log('connected to the server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('welcomeMessage', function (welcomeMessage) {
  console.log('New Message Received', welcomeMessage);
});
