import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { PropagateLoader } from 'react-spinners';
import { Bind } from 'lodash-decorators';

import AppLogoIcon from '../../common/icons/logo.svg';
import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

import auth from '../../firebase';
import { SIGN_IN } from '../../common/consts/routes';
import NotificationService from '../../common/services/notifications';

import './register.view.scss';
import translations from './register.view.intl';

@injectIntl
class Register extends Component {
  constructor(props) {
    super(props);
    const INITIAL_STATE = {
      name: '',
      email: '',
      password: '',
      isLoading: false,
      isApiError: '',
      apiError: ''
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
  @Bind()
  signUpWithEmailAndPassword() {
    this.setState({ isLoading: true });

    const { history, intl } = this.props;
    const { name, email, password } = this.state;

    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      auth.currentUser.updateProfile({displayName: name});
      history.push(SIGN_IN);
      NotificationService.success(intl.formatMessage(translations.signUpSuccess));
    }).catch((error) => {
      this.setState({
        isLoading: false,
        isApiError: true,
        apiError: error.message
      });
    });
  }

  /**
   * Method to set actually name to state
   */
  onNameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }


  /**
   * Method to set actually email to state
   */
  onEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  /**
   * Method to set actually password to state
   */
  onPasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    const { intl, history } = this.props;
    const { isLoading, isApiError, apiError, name, email, password } = this.state;

    const errorBox = (
      <div className="error-box">
        {apiError}
      </div>
    );

    return (
      <div className="signup-wrapper">
        <div className="signup-wrapper__content">
          <div className="signup-wrapper__content__logo">
            <AppLogoIcon width={54} height={54} />
            <div className="heading">
              <div className="heading__title">{intl.formatMessage(translations.appTitle)}</div>
              <div className="heading__subtitle">{intl.formatMessage(translations.appSubtitle)}</div>
            </div>
          </div>
          <div className="signup-wrapper__content__header">{intl.formatMessage(translations.signUpHeader)}</div>
          {isApiError && errorBox }
          <div className="signup-wrapper__content__subheader">{intl.formatMessage(translations.signUpSubheader)}</div>
          <Input
            type="text"
            placeholder={intl.formatMessage(translations.namePlaceholder)}
            value={name}
            onChange={(event) => this.onNameChange(event)}
          />
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
          <div class="divider" />
          <Button
            buttonStyle="button-primary"
            onClick={this.signUpWithEmailAndPassword}
          >
            {isLoading ? (
              <div className="signup-wrapper__content__loader-container">
                <PropagateLoader
                  size={12}
                  color={'#ffffff'}
                  loading={isLoading}
                />
              </div>)
              : intl.formatMessage(translations.signUp)
            }
          </Button>
          <div className="signup-wrapper__content__footer">
            <div className="signup-wrapper__content__footer__text">
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
      </div>
    );
  }
}

export default Register;
