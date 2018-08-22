export const RESET = "RESET";
export function reset() {
  return {
    type: RESET
  };
}

export const ADD_PROJECTILE = "ADD_PROJECTILE";
export function addProjectile(clickX, clickY) {
  return {
    type: ADD_PROJECTILE,
    payload: {
      clickX: clickX,
      clickY: clickY,
    }
  };
}

export const UPDATE_GAME = "UPDATE_GAME";
export function updateGame() {
  return {
    type: UPDATE_GAME,
  };
}

export const ADD_KEY_W = "ADD_KEY_W";
export function addKeyW() {
  return {
    type: ADD_KEY_W,
  };
}

export const ADD_KEY_A = "ADD_KEY_A";
export function addKeyA() {
  return {
    type: ADD_KEY_A,
  };
}

export const ADD_KEY_S = "ADD_KEY_S";
export function addKeyS() {
  return {
    type: ADD_KEY_S,
  };
}

export const ADD_KEY_D = "ADD_KEY_D";
export function addKeyD() {
  return {
    type: ADD_KEY_D,
  };
}

export const REMOVE_KEY_W = "REMOVE_KEY_W";
export function removeKeyW() {
  return {
    type: REMOVE_KEY_W,
  };
}

export const REMOVE_KEY_A = "REMOVE_KEY_A";
export function removeKeyA() {
  return {
    type: REMOVE_KEY_A,
  };
}

export const REMOVE_KEY_S = "REMOVE_KEY_S";
export function removeKeyS() {
  return {
    type: REMOVE_KEY_S,
  };
}

export const REMOVE_KEY_D = "REMOVE_KEY_D";
export function removeKeyD() {
  return {
    type: REMOVE_KEY_D,
  };
}
