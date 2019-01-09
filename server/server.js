const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
var publicPath = path.join(__dirname,'../public')

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.emit('welcomeMessage', generateMessage('Admin', 'Welcome to the chat room'));

  socket.broadcast.emit('welcomeMessage', generateMessage('Admin', 'New User Joined'));

  socket.on('createMessage', (message) => {
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });

});



server.listen(port, () => {
  console.log(`The app is up on port ${port}`);
})
