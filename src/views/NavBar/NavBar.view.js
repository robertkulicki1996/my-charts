import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { observer, inject } from 'mobx-react';
import { Bind } from 'lodash-decorators';
import Avatar from 'react-avatar';
import { SIGN_IN, DASHBOARD } from '../../common/consts/routes';

import { AuthStore } from '../../stores/auth';

import AppLogoIcon from '../../common/icons/logo.svg';
import Button from '../../common/components/Button/Button';
import ContextMenu from '../../common/components/ContextMenu/ContextMenu';

import translations from './NavBar.view.intl';
import './NavBar.view.scss';

@withRouter
@injectIntl
@inject('authStore')
@observer
export default class NavBar extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  @Bind()
  onTrySignOut() {
    const { authStore, history } = this.props;
    authStore.signOut().then(()=> {
      history.push(SIGN_IN);
    }).catch(e => {
      window.console.error(e);
    });
  }

  @Bind()
  goToDashboard() {
    this.props.history.push(DASHBOARD);
  }

  render() {
    const { intl } = this.props;

    const userContextMenu = (
      <React.Fragment>
       <Button
          buttonStyle="button-link" 
          textColor="light"    
          className="sign-out-button header-button" 
          onClick={this.goToDashboard} 
        >
          {intl.formatMessage(translations.dashboard)}
        </Button>
        <Button
          buttonStyle="button-link" 
          textColor="light"    
          className="sign-out-button bottom-button" 
          onClick={this.onTrySignOut} 
        >
          {intl.formatMessage(translations.signOut)}
        </Button>
      </React.Fragment>
    );

    return (
      <div className="navbar">
        <AppLogoIcon width={40} height={40} />
        <ContextMenu position="rightTop" body={userContextMenu}>
          <Avatar name="Robert Kulicki" size="48" round="20%" color="#293142" />
        </ContextMenu>
      </div>
    );
  }
}