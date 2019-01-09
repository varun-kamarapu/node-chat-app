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

  socket.emit('welcomeMessage', {
    from:'Admin',
    message: 'Welcome to the chat room',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('welcomeMessage', {
    from:'Admin',
    message:'New User Joined',
    createdAt: new Date().getTime()
  });



  // socket.on('createMessage', (message) => {
  //   socket.broadcast.emit('newMessage', {
  //     from: message.from,
  //     text: message.text,
  //     createdAt: new Date().getTime()
  //   });
  //
  // });

  socket.on('disconnect', () => {
    console.log('Client Disconnected');
  });

});



server.listen(port, () => {
  console.log(`The app is up on port ${port}`);
})
