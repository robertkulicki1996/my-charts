import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom';

import { HOME, SIGN_IN } from './common/consts/routes.js';

import Login from './views/login/login.view';
import Home from './views/home/home.view';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path={SIGN_IN} component={Login} />
          <Route path={HOME} component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;