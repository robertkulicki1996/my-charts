import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { HOME, SIGN_IN, SIGN_UP, RECOVER_PASSWORD } from './common/consts/routes.js';

import Login from './views/login/login.view';
import Register from './views/register/register.view';
import Home from './views/home/home.view';
import RecoverPassword from './views/recoverPassword/recoverPassword.view';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path={SIGN_IN} component={Login} />
          <Route path={SIGN_UP} component={Register} />
          <Route path={HOME} component={Home} />
          <Route path={RECOVER_PASSWORD} component={RecoverPassword} />
          <ToastContainer />
        </div>
      </Router>
    );
  }
}

export default App;