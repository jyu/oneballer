var arena = $('#arena'),
    player = $('#player'),
    maxValueX = arena.width() - player.width(),
    maxValueY = arena.height() - player.height(),
    keysPressed = {},
    playerX = 140,
    playerY = 140,
    projectiles = [],
    projectileID = 0,
    projSpeed = 8,
    playerSpeed = 5;

var arenaDim = getPosition(document.getElementById("arena"));
var arenaX = arenaDim.x;
var arenaY = arenaDim.y;

function calculateNewPlayerX(oldX, keyMinus, keyPlus) {
    var newX = parseInt(oldX, 10)
                   - (keysPressed[keyMinus] ? playerSpeed : 0)
                   + (keysPressed[keyPlus] ? playerSpeed : 0);
    return newX < 0 ? 0 : newX > maxValueX ? maxValueX : newX;
}

function calculateNewPlayerY(oldY, keyMinus, keyPlus) {
    var newY = parseInt(oldY, 10)
                   - (keysPressed[keyMinus] ? playerSpeed : 0)
                   + (keysPressed[keyPlus] ? playerSpeed : 0);
    return newY < 0 ? 0 : newY > maxValueY ? maxValueY : newY;
}

$(window).keydown(function(event) {
  keysPressed[event.which] = true; });
$(window).keyup(function(event) { keysPressed[event.which] = false; });

function calculateNewProjX(projectile) {
  newX = projectile.x + projectile.dx;
  if (newX > maxValueX || newX < 0) {
    projectile.dx = projectile.dx * -1;
    return projectile.x;
  }
  return newX;
}

function calculateNewProjY(projectile) {
  newY = projectile.y + projectile.dy;
  if (newY > maxValueY || newY < 0) {
    projectile.dy = projectile.dy * -1;
    return projectile.y;
  }
  return newY;
}

setInterval(function() {
    player.css({
        left: function(index ,oldValue) {
            playerX = calculateNewPlayerX(oldValue, 65, 68);
            return playerX;
        },
        top: function(index, oldValue) {
            playerY = calculateNewPlayerY(oldValue, 87, 83);
            return playerY;
        }
    });
    for(var i = 0; i < projectiles.length; i++) {
      var projectile = projectiles[i];
      $('#' + projectile.id).css({
        left: projectile.x = calculateNewProjX(projectile),
        top: projectile.y = calculateNewProjY(projectile)
      });
    }
}, 20);

arena.click(getClickPosition);

function getClickPosition(e) {
  var xPosition = e.clientX - arenaX;
  var yPosition = e.clientY - arenaY;
  var xDiff = xPosition - playerX;
  var yDiff = yPosition - playerY;
  var magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  projectiles.push({
     'dx':  projSpeed * xDiff / magnitude,
     'dy': projSpeed * yDiff / magnitude,
     'x': playerX,
     'y': playerY,
     'id': "projectile" + projectileID,
   });
  $('#arena').append('<div id="projectile' +  projectileID + '"class="projectile" style="top:' + playerY + 'px;left:' + playerX + 'px"></div>')
  projectileID += 1;
}

function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}
