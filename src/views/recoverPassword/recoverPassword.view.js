import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import AppLogoIcon from '../../common/icons/logo.svg';

import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

// import auth from '../../firebase';
import { SIGN_IN } from '../../common/consts/routes';

import { PropagateLoader } from 'react-spinners';

import './recoverPassword.view.scss';
import translations from './recoverPassword.view.intl';

import NotificationService from '../../common/services/notifications';

@injectIntl
class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    const INITIAL_STATE = {
      email: '',
      isSubmitDisabled: true,
      isApiError: false,
      apiError: null,
      isLoading: false
    }
    this.state = {
      ...INITIAL_STATE
    }
    this.onEmailChange = this.onEmailChange.bind(this);
    this.recoverPassword = this.recoverPassword.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  /**
   * Method to set actually email to state
   */
  onEmailChange(event) {
    const actualEmail = event.target.value;
    if (this.validateEmail(actualEmail)) {
      this.setState({
        email: actualEmail,
        isSubmitDisabled: false,
      });
    } else {
      this.setState({
        email: actualEmail,
        isSubmitDisabled: true,
      });
    }
  }

  /**
   * Method send a password reset email
   */
  recoverPassword(){
    this.setState({ isLoading: true });

    const { history, intl } = this.props;
    const { email } = this.state;

    // auth.sendPasswordResetEmail(email)
    // .then(() => {
    //   NotificationService.success(intl.formatMessage(translations.emailSended));
    //   this.setState({
    //     ...this.INITIAL_STATE,
    //   });
    //   history.push(SIGN_IN);
    // }).catch((error) => {
    //   this.setState({
    //     isLoading: false,
    //     isApiError: true,
    //     apiError: error.message
    //   });
    // });
  }

  /**
   * Method to validate email
   */
  validateEmail(email) {
    if(email.length > 0) {
      const regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
      return regex.test(email);
    }
    return false;
  }

  render() {
    const { intl, history } = this.props;
    const { isLoading, isSubmitDisabled, isApiError, apiError, email } = this.state;

    const errorBox = (
      <div className="error-box">
        {apiError}
      </div>
    );

    return (
      <div className="recover-password-wrapper">
        <div className="recover-password-wrapper__content">
          <div className="recover-password-wrapper__content__logo">
            <AppLogoIcon width={54} height={54} />
            <div className="heading">
              <div className="heading__title">{intl.formatMessage(translations.appTitle)}</div>
              <div className="heading__subtitle">{intl.formatMessage(translations.appSubtitle)}</div>
            </div>
          </div>
          <div className="recover-password-wrapper__content__header">{intl.formatMessage(translations.recoverPasswordHeader)}</div>
          <div className="recover-password-wrapper__content__subheader">{intl.formatMessage(translations.recoverPasswordSubheader)}</div>
          {isApiError && errorBox }
          <Input
            type="email"
            placeholder={intl.formatMessage(translations.emailPlaceholder)}
            value={email}
            onChange={(event) => this.onEmailChange(event)}
          />
          <Button
            buttonStyle="button-primary"
            disabled={isSubmitDisabled}
            onClick={() => this.recoverPassword()}
          >
            {isLoading ? (
              <div className="loader-container">
                <PropagateLoader
                  size={12}
                  color={'#ffffff'}
                  loading={isLoading}
                />
              </div>)
              : intl.formatMessage(translations.submit)
            }
          </Button>
          <div className="recover-password-wrapper__content__footer">
            <Button
              textColor="pink"
              buttonStyle="button-link"
              onClick={() => history.push(SIGN_IN)}
            >
              {intl.formatMessage(translations.back)}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default RecoverPassword;