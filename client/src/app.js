import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Game from './modules/Game';

const App = () => (

  <div id="app">
    <Route exact path="/" component={Game}/>
  </div>

);

// { pure: false } prevents React-blocked rendering when changing routes.
export default connect(null, null, null, { pure: false })(App);
