import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Bind } from 'lodash-decorators';
import { observable, action, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import { PropagateLoader } from 'react-spinners';
import { RECOVER_PASSWORD, SIGN_UP, CHOOSE_CHART_TYPE } from '../../common/consts/routes';

import { AuthStore } from '../../stores/auth';

import AppLogoIcon from '../../common/icons/logo.svg';
import GoogleLogoIcon from '../../common/icons/google.svg';
import FacebookLogoIcon from '../../common/icons/facebook.svg';
import GithubLogoIcon from '../../common/icons/github.svg';
import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

import './login.view.scss';
import translations from './login.view.intl';

@injectIntl
@inject('authStore')
@observer
export class Login extends Component {
  @observable email = '';
  @observable password = '';
  @observable isApiError = false;
  @observable apiError = '';
  @observable isLoading = false;

  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  @action.bound
  startLoading(){
    this.isLoading = true;
  }

  @action.bound
  stopLoading(){
    this.isLoading = false;
  }

  /**
   * Method to sign in with email and password
   */
  @Bind()
  onTrySignIn() {
    const { history, authStore } = this.props;
    this.startLoading();
    authStore.signIn(this.email, this.password).then((user) => {    
      history.push(CHOOSE_CHART_TYPE);
    })
    .catch(error => {
      this.stopLoading();
      runInAction(() => {
        this.isApiError = true;
        this.apiError = error.message;
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
  @action.bound
  async signInWithGithub() {
    const { history, authStore } = this.props;
    this.startLoading();
    await authStore.signInWithGitHub()
    .then(() => {    
      history.push(CHOOSE_CHART_TYPE);
    })
    .catch(error => {
      this.stopLoading();
      runInAction(() => {
        this.isApiError = true;
        this.apiError = error.message;
      });
    });
  }

  /**
   * Method to set actually email to state
   */
  @action.bound
  onEmailChange(event) {
    this.email = event.target.value;
  }

  /**
   * Method to set actually password to state
   */
  @action.bound
  onPasswordChange(event) {
    this.password = event.target.value;
  }

  render() {
    const { intl, history } = this.props;
    const { isLoading, isApiError, apiError, email, password } = this;

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
            onClick={this.onTrySignIn}
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
