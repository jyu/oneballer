import React from 'react';

import '../index.css';

export default class Projectile extends React.Component {

  render() {
    const projStyle = {
      top: this.props.projY,
      left: this.props.projX,
    }
    return (
      <div className="projectile" style={projStyle}>
      </div>
    );
  }
}
