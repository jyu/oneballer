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
type Player =
{
  'id': number,
  'socket': Object,
}

// List of rooms, which are arrays of players
var rooms = [];

// Input: Player Object
// Output: Room index
function addPlayerToRoom(player: Player) {
  // Check for free room
  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].length != 2) {
      rooms[i].push(player);
      return i;
    }
  }
  // No room has space
  var newRoom = [player];
  rooms.push(newRoom);
  return rooms.length - 1;
}

// Input: Player Object
function removePlayer(player: Player, roomID: number) {
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
  var roomID = addPlayerToRoom(player);
  console.log(rooms)

  socket.join(roomID);
  socket.to(roomID).emit('player '+String(player.id)+' connected');
  socket.emit('room_id', roomID);

  socket.on('disconnect', function(){
    console.log('user disconnected');
    removePlayer(player, roomID);
    console.log(rooms);
  });
});
