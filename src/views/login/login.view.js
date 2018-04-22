import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import AppLogoIcon from '../../common/icons/logo.svg';
import GoogleLogoIcon from '../../common/icons/google.svg';
import FacebookLogoIcon from '../../common/icons/facebook.svg';
import GithubLogoIcon from '../../common/icons/github.svg';
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
      error: null,
      isError: false,
      isLoading: false
    }
    this.state = { ...INITIAL_STATE }
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.signInWithFacebook = this.signInWithFacebook.bind(this);
    this.signInWithGithub = this.signInWithGithub.bind(this);
    this.signInWithEmailAndPassword = this.signInWithEmailAndPassword.bind(this);
  }

  signInWithEmailAndPassword(event) {
    const { email, password } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    auth.signInWithEmailAndPassword(email, password).then(() => {
      this.setState({
        ...this.INITIAL_STATE,
      });
      history.push(HOME);
    }).catch(error => {
      console.log(error);
      this.setState({
        isLoading: false,
        isError: true,
        error: error.message
      });
    });
    event.preventDefault();
  }

  signInWithGoogle() {
    console.log("Sign in with Google");
  }

  signInWithFacebook() {
    console.log("Sign in with Facebook");
  }

  signInWithGithub() {
    console.log("Sign in with Github");
  }

  render() {
    const { intl } = this.props;
    const { isLoading, isError, error } = this.state;

    const errorBox = (
      <div className="error-box">
        {error}
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
            { isError ? errorBox : null }
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
            <form onSubmit={(event) => this.signInWithEmailAndPassword(event)}>
              <Input
                type="email"
                required={true}
                placeholder={intl.formatMessage(translations.emailPlaceholder)}
                value={this.state.email}
                onChange={(event) => this.setState({ email: event.target.value })}
              />
              <Input
                type="password"
                required={true}
                placeholder={intl.formatMessage(translations.passwordPlaceholder)}
                value={this.state.password}
                onChange={(event) => this.setState({ password: event.target.value })}
              />
              <Button buttonStyle="button-primary">
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
            </form>
            <div className="forgot-password">
              <Button
                buttonStyle="button-link"
                onClick={() => console.log("dupa")}
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
