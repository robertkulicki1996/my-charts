import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { PropagateLoader } from 'react-spinners';

import AppLogoIcon from '../../common/icons/logo.svg';
import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

import auth from '../../firebase';
import { SIGN_IN } from '../../common/consts/routes';
import NotificationService from '../../common/services/notifications';

import './register.view.scss';
import translations from './register.view.intl';

class Register extends Component {
  constructor(props) {
    super(props);
    const INITIAL_STATE = {
      email: '',
      password: '',
      isLoading: false
    }
    this.state = {
      ...INITIAL_STATE
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  /**
   * Method to sign up with email and password
   */
  signUp() {
    this.setState({ isLoading: true });

    const { history, intl } = this.props;
    const { email, password } = this.state;

    auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.setState({
        ...this.INITIAL_STATE,
      });
      history.push(SIGN_IN);
      NotificationService.success(intl.formatMessage(translations.signUpSuccess));
    }).catch((error) => {
      this.setState({
        isLoading: false
      })
      NotificationService.error(error.message);
    });
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
      <div className="register-view-container">
        <div className="header">
          <AppLogoIcon width={32} height={32} />
          <div className="app-name">{intl.formatMessage(translations.appName)}</div>
        </div>
        {isApiError ? errorBox : null}
        <div className="content">
          <div className="info">
            <div className="info-header">{intl.formatMessage(translations.signUpHeader)}</div>
            <div className="info-subheader">{intl.formatMessage(translations.signUpSubheader)}</div>
          </div>
          <div className="divider"/>
          <div className="form">
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
              onClick={(event) => this.signUp()}
            >
              {isLoading ? (
                <div className="loader-container">
                  <PropagateLoader
                    size={12}
                    color={'#ffffff'}
                    loading={isLoading}
                  />
                </div>)
                : intl.formatMessage(translations.signUp)
              }
            </Button>
          </div>
        </div>
        <div className="footer">
          <div className="text">
            {intl.formatMessage(translations.alreadyHaveAnAccount)}
          </div>
          <Button
            textColor="pink"
            buttonStyle="button-link"
            onClick={() => history.push(SIGN_IN)}
          >
            {intl.formatMessage(translations.signIn)}
          </Button>
        </div>
      </div>
    );
  }
}

export default injectIntl(Register);
