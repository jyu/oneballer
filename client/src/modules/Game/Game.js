import React from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';

const mapStateToProps = store => ({
});

const mapDispatchToProps = dispatch => ({
});

class Game extends React.Component {

    componentDidMount() {
    }

    render() {
      return <div>Component Test</div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);﻿
