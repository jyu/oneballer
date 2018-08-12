// @flow

var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/view'));
// $FlowFixMe
var http = require('http').Server(app);
var io = require('socket.io')(http);

var server = http.listen(process.env.PORT || 8000, function () {
var port = server.address().port;
console.log("App now running on port", port);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/view/index.html');
});

var players = 0;
type Player = {'id': number, 'socket': Object};

// List of rooms, which are arrays of players
var rooms = [];

type RoomResponse = {
  'roomID': number,
  'roomFull': bool,
};
function addPlayerToRoom(player: Player) {
  // Check for free room
  for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    if (room.length != 2) {
      room.push(player);
      return {'roomID': i, 'roomFull': room.length === 2};
    }
  }
  // No room has space
  var newRoom = [player];
  rooms.push(newRoom);
  return {'roomID': rooms.length - 1, 'roomFull': false};
}

// Input: Player Object
function removePlayer(player: Player, roomID: number): void {
  var room = rooms[roomID];
  var rmPlayer = -1;
  for (var i = 0; i < room.length; i++) {
    var roomPlayer = room[i];
    if (roomPlayer.id === player.id) {
      rmPlayer = i;
    }
  }
  if (rmPlayer !== -1) {
    room.splice(rmPlayer, 1);
  }
}

io.on('connection', function(socket: Object){
  console.log('a user connected');
  players += 1;
  var player = {'id': players, 'socket': socket};
  var roomInfo = addPlayerToRoom(player);
  var roomID = roomInfo.roomID;
  console.log(rooms)
  socket.join(roomID);

  if (roomInfo.roomFull) {
    io.in(roomID).emit('room_full', 'Room is full');
  }

  socket.on('player_position', function(data) {
    socket.to(roomID).emit('opponent_position', data);
  })

  socket.on('new_projectile', function(data) {
    socket.to(roomID).emit('new_projectile', data);
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
    removePlayer(player, roomID);
    io.in(roomID).emit('room_not_full', 'Room is not full. Player left.');
    console.log(rooms);
  });
});
