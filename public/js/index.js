var socket = io();

socket.on('connect', function () {

  console.log('connected to the server');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (newMessage) {

  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: newMessage.from,
    createdAt: newMessage.createdAt,
    text: newMessage.text
  });
  jQuery('#messages').append(html);
});

socket.on('newGeoMessage', function (newGeoMessage) {
  var template = jQuery('#geo-message-template').html();
  var html = Mustache.render(template, {
    from: newGeoMessage.from,
    createdAt: newGeoMessage.createdAt,
    lat: newGeoMessage.lat,
    lon: newGeoMessage.lon,
  })
  jQuery('#messages').append(html);
});

jQuery('#sendButton').on('click', function (e) {
  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('[name=message]').val()
  }, function (ackMessage) {
      jQuery('[name=message]').val('')
  });
});

jQuery('#sendGeoLocationButton').on('click', function (e) {
    jQuery(navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('sendGeoLocation', {
      from: 'varun',
      lat: position.coords.latitude,
      lon: position.coords.longitude
    });
  }))
});
