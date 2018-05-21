import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

import auth from '../../firebase';
import { HOME } from '../../common/consts/routes';

import { PropagateLoader } from 'react-spinners';

import './login.view.scss';
import translations from './login.view.intl';

class Login extends Component {
  constructor(props) {
    super(props);
    const INITIAL_STATE = {
      email: '',
      password: '',
      isApiError: false,
      apiError: null,
      isLoading: false
    }
    this.state = {
      ...INITIAL_STATE
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  /**
   * Method to sign in with email and password
   */
  signInWithEmailAndPassword() {
    this.setState({ isLoading: true });

    const { history } = this.props;
    const { email, password } = this.state;

    auth.signInWithEmailAndPassword(email, password).then(() => {
      this.setState({
        ...this.INITIAL_STATE,
      });
      history.push(HOME);
    }).catch(error => {
      this.setState({
        isLoading: false,
        isApiError: true,
        apiError: error.message
      });
    });
  }

  /**
   * Method to sign in with Google account
   */
  signInWithGoogle() {
    console.log("Sign in with Google");
  }

  /**
   * Method to sign in with Facebook account
   */
  signInWithFacebook() {
    console.log("Sign in with Facebook");
  }

  /**
   * Method to sign in with Github account
   */
  signInWithGithub() {
    console.log("Sign in with Github");
  }

  /**
   * Method to set actually email to state
   */
  onEmailChange(event) {
    this.setState({
      email: event.target.value,
      emailError: null
    });
  }

  /**
   * Method to set actually password to state
   */
  onPasswordChange(event) {
    this.setState({
      password: event.target.value,
      passwordError: null
    });
  }

  render() {
    const { intl, history } = this.props;
    const { isLoading, isApiError, apiError, email, emailError, password, passwordError } = this.state;

    const errorBox = (
      <div className="error-box">
        {apiError}
      </div>
    );

    return (
      <div className="login-view-container">
        <div className="login-header">
          <AppLogoIcon width={32} height={32} />
          <div className="app-name">{intl.formatMessage(translations.appName)}</div>
        </div>
        <div className="login-content">
          <div className="login-form">
            <div className="login-form-header">{intl.formatMessage(translations.signInHeader)}</div>
            {isApiError ? errorBox : null}
            <div className="login-by-social-accounts">
              <Button
                buttonStyle="button-social"
                onClick={() => this.signInWithGoogle()}
              >
                <GoogleLogoIcon width={30} height={30} />
              </Button>
              <Button
                buttonStyle="button-social"
                onClick={() => this.signInWithFacebook()}
              >
                <FacebookLogoIcon width={30} height={30} />
              </Button>
              <Button
                buttonStyle="button-social"
                onClick={() => this.signInWithGithub()}
              >
                <GithubLogoIcon width={30} height={30} />
              </Button>
            </div>
            <div className="divider">
              {intl.formatMessage(translations.or)}
            </div>
            <Input
              type="email"
              placeholder={intl.formatMessage(translations.emailPlaceholder)}
              value={email}
              onChange={(event) => this.onEmailChange(event)}
              error={emailError}
            />
            <Input
              type="password"
              placeholder={intl.formatMessage(translations.passwordPlaceholder)}
              value={password}
              onChange={(event) => this.onPasswordChange(event)}
              error={passwordError}
            />
            <Button
              buttonStyle="button-primary"
              onClick={(event) => this.signInWithEmailAndPassword()}
            >
              {isLoading ? (
                <div className="loader-container">
                  <PropagateLoader
                    size={12}
                    color={'#ffffff'}
                    loading={isLoading}
                  />
                </div>)
                : intl.formatMessage(translations.signIn)
              }
            </Button>
            <div className="forgot-password">
              <Button
                buttonStyle="button-link"
                onClick={() => history.push(RECOVER_PASSWORD)}
              >
                {intl.formatMessage(translations.forgotPassword)}
              </Button>
            </div>
          </div>
        </div>
        <div className="login-footer">
          <div className="text">
            {intl.formatMessage(translations.doNotHaveAnAccount)}
          </div>
          <Button
            textColor="pink"
            buttonStyle="button-link"
            onClick={() => console.log("dupa")}
          >
            {intl.formatMessage(translations.signUp)}
          </Button>
        </div>
      </div>
    );
  }
}

export default injectIntl(Login);
