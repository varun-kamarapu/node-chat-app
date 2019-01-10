var socket = io();

socket.on('connect', function () {

  console.log('connected to the server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (newMessage) {

  var messages = jQuery('#messages');
  var li = jQuery('<li class="list-group-item"></li>');
  li.text(`${newMessage.from}: ${newMessage.text}`);
  messages.append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'Varun',
    text: jQuery('[name=message]').val()
  }, function (ackMessage) {
      jQuery('[name=message]').val('')
  });

})
