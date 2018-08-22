import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { observer, inject } from 'mobx-react';
import { Bind } from 'lodash-decorators';
import { SIGN_IN } from '../../common/consts/routes';

import { AuthStore } from '../../stores/auth.store';

import AppLogoIcon from '../../common/icons/logo.svg';
import Button from '../../common/components/Button/Button';
import ContextMenu from '../../common/components/ContextMenu/ContextMenu';
import AvatarWithName from '../../common/components/AvatarWithName/AvatarWithName';
import UserAvatar from 'react-user-avatar';

import translations from './header.view.intl';
import './header.view.scss';

@withRouter
@injectIntl
@inject('authStore')
@observer
export default class Header extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  @Bind()
  onTrySignOut() {
    const { authStore, history } = this.props;
    authStore.signOut().then(()=> {
      history.push(SIGN_IN);
    }).catch(e => {
      // TODO: Handle error
      window.console.error(e);
    });
  }

  render() {
    const { intl } = this.props;

    const userContextMenu = (
      <React.Fragment>
        <AvatarWithName name="Robert Kulicki" bottomBorder/>
        <div className="link">My link</div>
        <div className="link">My another link</div>
        <div className="link">Last hardcoded link</div>
        <Button
          buttonStyle="button-link" 
          textColor="pink"
          className="sign-out-button" 
          onClick={this.onTrySignOut} 
        >
          {intl.formatMessage(translations.signOut)}
        </Button>
      </React.Fragment>
    );

    return (
      <div className="header">
        <AppLogoIcon width={40} height={40} />
        <ContextMenu body={userContextMenu} >
          <UserAvatar size="40" name="Robert Kulicki" color="#272f40" />
        </ContextMenu>
      </div>
    );
  }
}