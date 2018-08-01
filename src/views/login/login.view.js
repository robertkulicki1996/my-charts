import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Bind } from 'lodash-decorators';
import { PropagateLoader } from 'react-spinners';
import { HOME, RECOVER_PASSWORD, SIGN_UP } from '../../common/consts/routes';

import auth from '../../firebase';

import AppLogoIcon from '../../common/icons/logo.svg';
import GoogleLogoIcon from '../../common/icons/google.svg';
import FacebookLogoIcon from '../../common/icons/facebook.svg';
import GithubLogoIcon from '../../common/icons/github.svg';
import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

import './login.view.scss';
import translations from './login.view.intl';

@injectIntl
class Login extends Component {
  constructor(props) {
    super(props);
    const INITIAL_STATE = {
      email: '',
      password: '',
      isApiError: false,
      apiError: '',
      isLoading: false
    }
    this.state = {
      ...INITIAL_STATE
    }
  }

  /**
   * Method to sign in with email and password
   */
  @Bind()
  signInWithEmailAndPassword() {
    this.setState({ isLoading: true });

    const { history } = this.props;
    const { email, password } = this.state;

    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
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
  @Bind()
  signInWithGoogle() {
    console.log("Sign in with Google");
  }

  /**
   * Method to sign in with Facebook account
   */
  @Bind()
  signInWithFacebook() {
    console.log("Sign in with Facebook");
  }

  /**
   * Method to sign in with Github account
   */
  @Bind()
  signInWithGithub() {
    console.log("Sign in with Github");
  }

  /**
   * Method to set actually email to state
   */
  @Bind()
  onEmailChange(event) {
    this.setState({
      email: event.target.value,
      emailError: null
    });
  }

  /**
   * Method to set actually password to state
   */
  @Bind()
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
      <div className="signin-wrapper">
        <div className="signin-wrapper__content">
          <div className="signin-wrapper__content__logo">
            <AppLogoIcon width={54} height={54} />
            <div className="heading">
              <div className="heading__title">{intl.formatMessage(translations.appTitle)}</div>
              <div className="heading__subtitle">{intl.formatMessage(translations.appSubtitle)}</div>
            </div>
          </div>
          <div className="signin-wrapper__content__header">{intl.formatMessage(translations.signInHeader)}</div>
          {isApiError && errorBox}
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
            onClick={this.signInWithEmailAndPassword}
          >
            {isLoading ? (
              <div className="signin-wrapper__content__loader-container">
                <PropagateLoader
                  size={12}
                  color={'#ffffff'}
                  loading={isLoading}
                />
              </div>)
              : intl.formatMessage(translations.signIn)
            }
          </Button>
          <div className="signin-wrapper__content__forgot-password">
            <Button 
              buttonStyle="button-link"
              onClick={() => history.push(RECOVER_PASSWORD)}
            >
              {intl.formatMessage(translations.forgotPassword)}
            </Button>
          </div>
          <div className="signin-wrapper__content__divider">
            {intl.formatMessage(translations.orContinueWith)}
          </div>
          <div className="signin-wrapper__content__social-accounts">
            <Button
              buttonStyle="button-social"
              onClick={this.signInWithGoogle}
            >
              <GoogleLogoIcon width={30} height={30} />
            </Button>
            <Button
              buttonStyle="button-social"
              onClick={this.signInWithFacebook}
            >
              <FacebookLogoIcon width={30} height={30} />
            </Button>
            <Button
              buttonStyle="button-social"
              onClick={this.signInWithGithub}
            >
              <GithubLogoIcon width={30} height={30} />
            </Button>
          </div>
          <div className="signin-wrapper__content__footer">
            <div className="signin-wrapper__content__footer__text">
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
    );
  }
}

export default Login;
