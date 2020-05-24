const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const {generateMessage, generateGeoMessage} = require('./utils/message');
const {isRealString}= require('./utils/validation')
const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname,'../public')

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
        callback('Name and Room Name are required')
      }

      socket.join(params.room);

      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

      callback();
  });



  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('sendGeoLocation', (coordinates) => {
    io.emit('newGeoMessage', generateGeoMessage(coordinates.from, coordinates.lat, coordinates.lon))
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });

});

server.listen(port, () => {
  console.log(`The app is up on port ${port}`);
})
