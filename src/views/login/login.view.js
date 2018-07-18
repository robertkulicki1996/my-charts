import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import AppLogoIcon from '../../common/icons/logo.svg';
import GoogleLogoIcon from '../../common/icons/google.svg';
import FacebookLogoIcon from '../../common/icons/facebook.svg';
import GithubLogoIcon from '../../common/icons/github.svg';
import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

import auth from '../../firebase';
import { HOME, RECOVER_PASSWORD, SIGN_UP } from '../../common/consts/routes';

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
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.signInWithFacebook = this.signInWithFacebook.bind(this);
    this.signInWithGithub = this.signInWithGithub.bind(this);
    this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
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
    const { isLoading, isApiError, apiError, email, password } = this.state;

    const errorBox = (
      <div className="error-box">
        {apiError}
      </div>
    );

    return (
      <div className="login-view-wrapper">
        {/* <div className="login-view-wrapper__header">
          <AppLogoIcon width={54} height={54} />
          <div className="logo-info-wrapper">
            <div className="logo-info-wrapper__app-title">{intl.formatMessage(translations.appTitle)}</div>
            <div className="logo-info-wrapper__app-subtitle">{intl.formatMessage(translations.appSubtitle)}</div>
          </div>
        </div> */}
        <div className="login-view-wrapper__content">
          {/* <div className="logo-wrapper">
            <AppLogoIcon width={96} height={96} />
            <div className="logo-info-wrapper">
              <div className="logo-info-wrapper__app-title">{intl.formatMessage(translations.appTitle)}</div>
              <div className="logo-info-wrapper__app-subtitle">{intl.formatMessage(translations.appSubtitle)}</div>
            </div>
          </div> */}
          <div className="login-form">
            <div className="logo-wrapper">
              <AppLogoIcon width={54} height={54} />
              <div className="logo-info-wrapper">
                <div className="logo-info-wrapper__app-title">{intl.formatMessage(translations.appTitle)}</div>
                <div className="logo-info-wrapper__app-subtitle">{intl.formatMessage(translations.appSubtitle)}</div>
              </div>
            </div>
            <div className="login-form-header">{intl.formatMessage(translations.signInHeader)}</div>
            {isApiError ? errorBox : null}
            <Input
              type="email"
              placeholder={intl.formatMessage(translations.emailPlaceholder)}
              value={email}
              onChange={(event) => this.onEmailChange(event)}
            />
            <Input
              type="password"
              placeholder={intl.formatMessage(translations.passwordPlaceholder)}
              value={password}
              onChange={(event) => this.onPasswordChange(event)}
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
            <div className="divider">
              or continue with
            </div>
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
            <div className="login-footer">
              <div className="text">
                {intl.formatMessage(translations.doNotHaveAnAccount)}
              </div>
              <Button
                textColor="pink"
                buttonStyle="button-link"
                onClick={() => history.push(SIGN_UP)}
              >
                {intl.formatMessage(translations.signUp)}
              </Button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(Login);
