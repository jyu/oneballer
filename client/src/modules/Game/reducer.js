import { Map, fromJS } from 'immutable';


var init = {
  playerX: 140,
  playerY: 200,
  keyPressed: {'w': false, 'a': false, 's': false, 'd': false},
}

var width = 766,
    height = 366,
    playerSpeed = 5;

init = Map(fromJS(init));

export default function reducer(state=init, action) {
  switch(action.type) {
    case 'RESET': {
      state = init;
      break;
    }
    case 'UPDATE_PLAYER': {
      var keyPressed = state.get('keyPressed');
      console.log(keyPressed)
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
