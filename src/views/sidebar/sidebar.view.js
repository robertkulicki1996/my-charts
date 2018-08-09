import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { Bind } from 'lodash-decorators';
import { SIGN_IN } from '../../common/consts/routes';

import { AuthStore } from '../../stores/auth.store';

import AppLogoIcon from '../../common/icons/logo.svg';
import UserAvatar from '../../common/icons/UserAvatar.svg';
import Button from '../../common/components/Button/Button';
import ContextMenu from '../../common/components/ContextMenu/ContextMenu';

import translations from './sidebar.view.intl';
import './sidebar.view.scss';

export class Body extends Component {
  @Bind()
  onTrySignOut() {
    const { authStore, history } = this.props;
    authStore.signOut().then(()=> {
      history.push(SIGN_IN);
    }).catch(() => {
      console.log('nie zostałeś wylogowny');
    });
  }
  render() {
  return (
    <div className="user-context-menu">
    <div className="user-context-menu__user-info">
      <UserAvatar className="user-avatar" width={24} height={24} />
      <div>Robert Kulicki</div>
    </div>
    <Button buttonStyle="button-link" onClick={this.onTrySignOut} >sdsd</Button>
  </div>
  );
}
}

@injectIntl
@inject('authStore')
@observer
export default class Sidebar extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  @observable 
  isUserContextMenuShown = false;

  @action.bound
  showUserContextMenu() {
    this.isUserContextMenuShown = true;
  }

  @action.bound
  hideUserContextMenu() {
    this.isUserContextMenuShown = false;
  }
  

  render() {
    const { intl } = this.props;

    // const userContextMenu  = (
    //   <div className="user-context-menu">
    //     <div className="user-context-menu__user-info">
    //       <UserAvatar className="user-avatar" width={24} height={24} />
    //       <div>Robert Kulicki</div>
    //     </div>
    //     <Button buttonStyle="button-link" onClick={this.onTrySignOut} >{intl.formatMessage(translations.signOut)}</Button>
    //   </div>
    // );
  
    return (
      <div className="header">
        <AppLogoIcon width={48} height={48} />
        <UserAvatar className="user-avatar" width={48} height={48} onClick={this.showUserContextMenu} />
        {this.isUserContextMenuShown && <ContextMenu onClose={this.hideUserContextMenu}> <Body /> </ContextMenu>}
      </div>
    );
  }
}