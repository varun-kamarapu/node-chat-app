const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const port = process.env.PORT || 3000;

var publicPath = path.join(__dirname,'../public')

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Saika',
    text: 'Hello! Hru doing?',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('create Message received', message);
  });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });

});



server.listen(port, () => {
  console.log(`The app is up on port ${port}`);
})
