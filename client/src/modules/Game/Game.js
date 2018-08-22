import React from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';

import { reset, updatePlayer, addKeyW, addKeyA, addKeyS, addKeyD, removeKeyW,
         removeKeyA, removeKeyS, removeKeyD,
} from './actions';

import './index.css';

const mapStateToProps = store => ({
  playerX: store.Game.get( 'playerX' ),
  playerY: store.Game.get( 'playerY' ),
  keyPressed: store.Game.get( 'keyPressed' ),
});

const mapDispatchToProps = dispatch => ({
  reset: () => {
    dispatch( reset() );
  },
  updatePlayer: () => {
    dispatch( updatePlayer() );
  },
  addKeyW: () => {
    dispatch( addKeyW() );
  },
  addKeyA: () => {
    dispatch( addKeyA() );
  },
  addKeyS: () => {
    dispatch( addKeyS() );
  },
  addKeyD: () => {
    dispatch( addKeyD() );
  },
  removeKeyW: () => {
    dispatch( removeKeyW() );
  },
  removeKeyA: () => {
    dispatch( removeKeyA() );
  },
  removeKeyS: () => {
    dispatch( removeKeyS() );
  },
  removeKeyD: () => {
    dispatch( removeKeyD() );
  },
});

class Game extends React.Component {

  componentWillMount() {
    document.addEventListener( 'keydown', this.keyDownHandler.bind( this ) );
    document.addEventListener( 'keyup', this.keyUpHandler.bind( this ) );
    let updatePlayer = this.props.updatePlayer;
    setInterval(function() {
      updatePlayer();
    }, 20);
  }

  componentWillUnMount() {
    document.removeEventListener( 'keydown', this.keyDownHandler.bind( this ) );
    document.removeEventListener( 'keyup', this.keyUpHandler.bind( this ) );
  }

  getHeader() {
    return (
    <div id="header">
      <h1>Welcome to Baller: There can only be one baller</h1>
      <h5>You are red, your opponent is blue</h5>
      <h5>WASD to move, point to shoot</h5>
      <span>Game status:</span>
      <span><h5 id="status">Waiting for opponent</h5></span>
    </div>);
  }

  keyDownHandler( event ) {
    switch (event.key) {
      case 'w': {
        this.props.addKeyW();
        break;
      }
      case 'a': {
        this.props.addKeyA();
        break;
      }
      case 's': {
        this.props.addKeyS();
        break;
      }
      case 'd': {
        this.props.addKeyD();
        break;
      }
      default:
        break;
    }
  }

  keyUpHandler( event ) {
    switch (event.key) {
      case 'w': {
        this.props.removeKeyW();
        break;
      }
      case 'a': {
        this.props.removeKeyA();
        break;
      }
      case 's': {
        this.props.removeKeyS();
        break;
      }
      case 'd': {
        this.props.removeKeyD();
        break;
      }
      default:
        break;
    }
  }

  render() {
    const playerStyle = {
      top: this.props.playerY,
      left: this.props.playerX,
    }
    return (
    <div>
      { this.getHeader() }
      <div id="arena">
        <div id="player" style={ playerStyle }></div>
      </div>
    </div>);
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( Game );
