import { Map, fromJS } from 'immutable';


var init = {
  playerX: 140,
  playerY: 200,
  keyPressed: {'w': false, 'a': false, 's': false, 'd': false},
  projectiles: [],
}

var width = 766,
    height = 366,
    playerSpeed = 5,
    projSpeed = 3;

init = Map(fromJS(init));

export default function reducer(state=init, action) {
  switch(action.type) {
    case 'RESET': {
      state = init;
      break;
    }
    case 'ADD_PROJECTILE': {
      var xPosition = action.payload.clickX;
      var yPosition = action.payload.clickY;
      var playerX = state.get('playerX');
      var playerY = state.get('playerY');
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
       };
      let newProjectiles = state.get('projectiles').push(projectile);
      state = state.set('projectiles', newProjectiles);
      break;
    }
    case 'UPDATE_GAME': {
      // Projeciles

      // Player keypress
      var keyPressed = state.get('keyPressed');
      var y = state.get('playerY');
      if (keyPressed.get('w')) {
        y += playerSpeed * -1;
      }
      if (keyPressed.get('s')) {
        y += playerSpeed;
      }
      y = y < 0 ? 0 : y > height ? height : y;
      var x = state.get('playerX');
      if (keyPressed.get('a')) {
        x += playerSpeed * -1;
      }
      if (keyPressed.get('d')) {
        x += playerSpeed;
      }
      x = x < 0 ? 0 : x > width ? width : x;
      state = state.set('playerX', x);
      state = state.set('playerY', y);
      break;
    }
    case 'ADD_KEY_W': {
      state = state.setIn(['keyPressed', 'w'], true);
      break;
    }
    case 'ADD_KEY_A': {
      state = state.setIn(['keyPressed', 'a'], true);
      break;
    }
    case 'ADD_KEY_S': {
      state = state.setIn(['keyPressed', 's'], true);
      break;
    }
    case 'ADD_KEY_D': {
      state = state.setIn(['keyPressed', 'd'], true);
      break;
    }
    case 'REMOVE_KEY_W': {
      state = state.setIn(['keyPressed', 'w'], false);
      break;
    }
    case 'REMOVE_KEY_A': {
      state = state.setIn(['keyPressed', 'a'], false);
      break;
    }
    case 'REMOVE_KEY_S': {
      state = state.setIn(['keyPressed', 's'], false);
      break;
    }
    case 'REMOVE_KEY_D': {
      state = state.setIn(['keyPressed', 'd'], false);
      break;
    }
    default: {
      break;
    }
  }
  return state;
};

function isIntersect(x, y, projX, projY) {
  var xDiff = x - projX;
  var yDiff = y - projY;
  var magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  return magnitude < 20;
}
