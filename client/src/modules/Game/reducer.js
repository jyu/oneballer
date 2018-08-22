import { Map, fromJS } from 'immutable';


let init = {
  playerX: 140,
  playerY: 200,
  keyPressed: {'w': false, 'a': false, 's': false, 'd': false},
  projectiles: [],
}

let width = 766,
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
      let xPosition = action.payload.clickX;
      let yPosition = action.payload.clickY;
      let playerX = state.get('playerX');
      let playerY = state.get('playerY');
      let xDiff = xPosition - playerX;
      let yDiff = yPosition - playerY;
      let magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      let dx = projSpeed * xDiff / magnitude;
      let dy = projSpeed * yDiff / magnitude
      let projX = playerX;
      let projY = playerY;
      while(isIntersect(playerX, playerY, projX, projY)) {
        projX += 2 * dx;
        projY += 2 * dy;
      }
      let projectile = {
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
      let newProjectiles = state.get('projectiles')
      .map(projectile => {
        let xInfo = calculateNewProjX(projectile);
        let yInfo = calculateNewProjY(projectile);
        return {
          'dx': xInfo.dx,
          'dy': yInfo.dy,
          'x': xInfo.x,
          'y': yInfo.y,
        };
      })
      state = state.set('projectiles', newProjectiles);
      // Player keypress
      let keyPressed = state.get('keyPressed');
      let y = state.get('playerY');
      if (keyPressed.get('w')) {
        y += playerSpeed * -1;
      }
      if (keyPressed.get('s')) {
        y += playerSpeed;
      }
      y = y < 0 ? 0 : y > height ? height : y;
      let x = state.get('playerX');
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
  let xDiff = x - projX;
  let yDiff = y - projY;
  let magnitude = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  return magnitude < 20;
}


function calculateNewProjX(projectile): number {
  let newX = projectile.x + projectile.dx;
  if (newX > width || newX < 0) {
    let dx = projectile.dx * -1;
    return {'x': projectile.x, 'dx': dx};
  }
  return {'x': newX, 'dx': projectile.dx};
}

function calculateNewProjY(projectile): number {
  let newY = projectile.y + projectile.dy;
  if (newY > height || newY < 0) {
    let dy = projectile.dy * -1;
    return {'y': projectile.y, 'dy': dy};
  }
  return {'y': newY, 'dy': projectile.dy};
}
