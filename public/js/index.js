var socket = io();

socket.on('connect', function () {
  console.log('connected to the server');

  socket.emit('createMessage',{
    text: 'I am doing fine',
    from: 'Varun'
  });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (newMessage) {
  console.log('New Message Received', newMessage);
});
