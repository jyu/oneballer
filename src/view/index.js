//@flow

type Projectile = {
  'dx': number,
  'dy': number,
  'x': number,
  'y': number,
  'id': string,
};

type Position = {
  'x': number,
  'y': number
}

var arena = $('#arena'),
    player = $('#player'),
    maxValueX = arena.width() - player.width(),
    maxValueY = arena.height() - player.height(),
    keysPressed = {},
    playerX = 140,
    playerY = 200,
    projectiles = [],
    projectileID = 0,
    projSpeed = 8,
    playerSpeed = 5,
    gameOver = false;

var arenaElement = document.getElementById("arena");
if (arenaElement === null) {
  throw(new Error);
}
var arenaDim = getPosition(arenaElement);
var arenaX = arenaDim.x;
var arenaY = arenaDim.y;

function calculateNewPlayerX(oldX: number, keyMinus: number, keyPlus: number): number {
  var newX = parseInt(oldX, 10)
             - (keysPressed[keyMinus] ? playerSpeed : 0)
             + (keysPressed[keyPlus] ? playerSpeed : 0);
  return newX < 0 ? 0 : newX > maxValueX ? maxValueX : newX;
}

function calculateNewPlayerY(oldY: number, keyMinus: number, keyPlus: number): number {
  var newY = parseInt(oldY, 10)
             - (keysPressed[keyMinus] ? playerSpeed : 0)
             + (keysPressed[keyPlus] ? playerSpeed : 0);
  return newY < 0 ? 0 : newY > maxValueY ? maxValueY : newY;
}

$(window).keydown(function(event: KeyboardEvent) {
  if (gameOver) {
    return;
  }
  keysPressed[event.which] = true; });
$(window).keyup(function(event: KeyboardEvent) {
  if (gameOver) {
    return;
  }
  keysPressed[event.which] = false; });

function calculateNewProjX(projectile: Projectile): number {
  var newX = projectile.x + projectile.dx;
  if (newX > maxValueX || newX < 0) {
    projectile.dx = projectile.dx * -1;
    return projectile.x;
  }
  return newX;
}

function calculateNewProjY(projectile: Projectile): number {
  var newY = projectile.y + projectile.dy;
  if (newY > maxValueY || newY < 0) {
    projectile.dy = projectile.dy * -1;
    return projectile.y;
  }
  return newY;
}

setInterval(function() {
    player.css({
        left: function(index, oldValue) {
            playerX = calculateNewPlayerX(oldValue, 65, 68);
            return playerX;
        },
        top: function(index, oldValue) {
            playerY = calculateNewPlayerY(oldValue, 87, 83);
            return playerY;
        }
    });
    if (socket) {
      socket.emit('player_position', { 'x': playerX, 'y': playerY });
    }
    for(var i = 0; i < projectiles.length; i++) {
      var projectile = projectiles[i];
      if (isIntersect(playerX, playerY, projectile.x, projectile.y)) {
        if (socket) {
          socket.emit('game_over', 'game_over');
        }
        endGame(false);
      }
      $('#' + projectile.id).css({
        left: projectile.x = calculateNewProjX(projectile),
        top: projectile.y = calculateNewProjY(projectile)
      });
    }
}, 20);

arena.click(getClickPosition);

function getClickPosition(e: MouseEvent): void {
  if (gameOver) {
    return;
  }
  var xPosition = e.clientX - arenaX;
  var yPosition = e.clientY - arenaY;
  var xDiff = xPosition - playerX;
  var yDiff = yPosition - playerY;
  var magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  var dx = projSpeed * xDiff / magnitude;
  var dy = projSpeed * yDiff / magnitude
  var projX = playerX;
  var projY = playerY;
  while(isIntersect(playerX, playerY, projX, projY)) {
    projX += 2 * dx;
    projY += 2 * dy;
  }
  var projectile = {
     'dx': dx,
     'dy': dy,
     'x': projX,
     'y': projY,
     'id': "projectile" + projectileID,
   };
   if (socket) {
     socket.emit('new_projectile', projectile);
   }
   addProjectile(projectile);
  projectileID += 1;
}

function isIntersect(x, y, projX, projY) {
  var xDiff = x - projX;
  var yDiff = y - projY;
  var magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  return magnitude < 20;
}

function addProjectile(projectile: Projectile): void {
  projectiles.push(projectile);
  $('#arena').append('<div id="' +  projectile.id + '"class="projectile" style="top:' + projectile.y + 'px;left:' + projectile.x + 'px"></div>');
}

function getPosition(el: HTMLElement): Position {
  var xPosition = 0;
  var yPosition = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      // $FlowFixMe
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      // $FlowFixMe
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }
    // $FlowFixMe
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}

function endGame(didWin: bool): void {
  if (didWin) {
    alert("U WON THE GAME!");
    $('#status').text('GAME OVER YOU WON, Refresh to start a new game');
  } else {
    alert("U lost the game...");
    $('#status').text('GAME OVER YOU LOST, Refresh to start a new game');
  }
  projectiles = [];
  gameOver = true;
}

// Opponent is flipped for player
function flipX(x: number): number {
  return arena.width() - player.width() - x;
}

// $FlowFixMe
var socket = io();
socket.on('room_full', function(msg){
 $('#status').text('Opponent found, GAME STARTS');
 $('#arena').append('<div id="opponent"></div>');
});

socket.on('opponent_position', function(data){
 $('#opponent').css({
   left: flipX(data.x),
   top: data.y
 });
});

socket.on('new_projectile', function(projectile){
  var newProjectile = {
     'dx': -1 * projectile.dx,
     'dy': projectile.dy,
     'x': flipX(projectile.x),
     'y': projectile.y,
     'id': "opponent-" + projectile.id,
   };
  addProjectile(newProjectile);
});

socket.on('game_over', function(data){
 endGame(true);
});

socket.on('player_left', function(data) {
  $('#status').text('Waiting for Opponent');
  $('#opponent').remove();
});
