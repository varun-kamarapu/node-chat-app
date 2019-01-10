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

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
    callback('From Server');

  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });

});



server.listen(port, () => {
  console.log(`The app is up on port ${port}`);
})
