// Required imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, BrowserRouter as Router, } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { AuthStore } from '../../stores/auth.store';

// Application views
import Login from '../../views/login/login.view';
import Register from '../../views/register/register.view';
import Home from '../../views/home/home.view';
import RecoverPassword from '../../views/recoverPassword/recoverPassword.view';

// Routes defined in application
export const SIGN_IN = '/';
export const RECOVER_PASSWORD = '/recover-password';
export const SIGN_UP = '/sign-up';
export const HOME = '/home';


// Application routes
@inject('authStore')
@observer
export default class ApplictionRoutes extends Component {
    static propTypes = {
        authStore: PropTypes.instanceOf(AuthStore).isRequired
    }
    
    render() {
        const { authStore } = this.props;
        const isUserAuthorized = authStore.isUserAuthed();

        const publicRoutes = (
            <Switch>
                <Route exact path={SIGN_IN} component={Login} />
                <Route path={SIGN_UP} component={Register} />
                <Route path={RECOVER_PASSWORD} component={RecoverPassword} />
                <Route component={Login} />
            </Switch>
        );
    
        const privateRoutes = (
            <Switch>
                <Route exact path={SIGN_IN} component={Login} />
                <Route path={SIGN_UP} component={Register} />
                <Route path={RECOVER_PASSWORD} component={RecoverPassword} />
            </Switch>
        );

        return (
            <Router>
                {isUserAuthorized ? privateRoutes : publicRoutes}
            </Router>
        );
    }
}
