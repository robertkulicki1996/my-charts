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
      // TODO: Handle error
      window.console.error(e);
    });
  }

  render() {
    const { intl } = this.props;

    const userContextMenu = (
      <React.Fragment>
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
        <ContextMenu body={userContextMenu} position="bottom" >
          <AvatarWithName name="Robert Kulicki" />
        </ContextMenu>
      </div>
    );
  }
}