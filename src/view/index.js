var arena = $('#arena'),
    player = $('#player'),
    maxValueX = arena.width() - player.width(),
    maxValueY = arena.height() - player.height(),
    keysPressed = {},
    distancePerIteration = 3
    playerX = 140,
    playerY = 140,
    projectiles = [],
    projectileID = 0;

var arenaDim = getPosition(document.getElementById("arena"));
var arenaX = arenaDim.x;
var arenaY = arenaDim.y;

function calculateNewValueX(oldValue, keyCode1, keyCode2) {
    var newValue = parseInt(oldValue, 10)
                   - (keysPressed[keyCode1] ? distancePerIteration : 0)
                   + (keysPressed[keyCode2] ? distancePerIteration : 0);
    return newValue < 0 ? 0 : newValue > maxValueX ? maxValueX : newValue;
}

function calculateNewValueY(oldValue, keyCode1, keyCode2) {
    var newValue = parseInt(oldValue, 10)
                   - (keysPressed[keyCode1] ? distancePerIteration : 0)
                   + (keysPressed[keyCode2] ? distancePerIteration : 0);
    return newValue < 0 ? 0 : newValue > maxValueY ? maxValueY : newValue;
}

$(window).keydown(function(event) {
  keysPressed[event.which] = true; });
$(window).keyup(function(event) { keysPressed[event.which] = false; });

setInterval(function() {
    player.css({
        left: function(index ,oldValue) {
            playerX = calculateNewValueX(oldValue, 65, 68);
            return playerX;
        },
        top: function(index, oldValue) {
            playerY = calculateNewValueY(oldValue, 87, 83);
            return playerY;
        }
    });
    for(var i = 0; i < projectiles.length; i++) {
      var projectile = projectiles[i];
      var xDiff = projectile.endX - projectile.x;
      var yDiff = projectile.endY - projectile.y;
      var magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      $('#' + projectile.id).css({
        left: projectile.x += 4 * xDiff / magnitude,
        top: projectile.y += 4 * yDiff / magnitude,
      });
    }
}, 20);

arena.click(getClickPosition);

function getClickPosition(e) {
  var xPosition = e.clientX - arenaX;
  var yPosition = e.clientY - arenaY;
  projectiles.push({
     'endX': xPosition,
     'endY': yPosition,
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
