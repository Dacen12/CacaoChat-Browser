"use strict";

var express = require('express');

var http = require('http');

var path = require('path');

var app = express();
var server = http.createServer(app);

var socket = require('socket.io')(server);

var _require = require('./client/class/User'),
    joinUserToRoom = _require.joinUserToRoom;

app.use(express.json());
socket.on("connection", function (socket) {
  console.log(socket.id);
  socket.on('roomJoined', function (username, room) {
    socket.join(room);
    var user = joinUserToRoom(socket.id, username, room);
    console.log("user is : ".concat(user.username, " inside room : ").concat(user.room));
    socket.on('messageToOthers', function (username, message) {
      console.log("inside message from others: " + username + 'and the message is: ' + message);
      socket.broadcast["in"](user.room).emit('receivedMessage', (username, message));
    });
  });
});
app.use(express["static"](path.join(__dirname, '/client/'), {
  index: 'index.html'
}));
server.listen(3000, function () {
  console.log('listening on port 3000');
}); //Sent: {"event":"roomJoined","data":{"username":"hii","room":"hii"}}