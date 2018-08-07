import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Bind } from 'lodash-decorators';
import { SIGN_IN } from './../../consts/routes';

import { AuthStore } from '../../../stores/auth.store';

import AppLogoIcon from '../../icons/logo.svg';
import UserAvatar from '../../icons/UserAvatar.svg';
import Button from './../Button/Button';
import ContextMenu from '../ContextMenu/ContextMenu';

import './ApplicationSidebar.scss';

@inject('authStore')
@observer
export default class ApplicationSidebar extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }
  
  static defaultProps = {
    leftSide: null
  };

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
      <div className="header">
        <AppLogoIcon width={48} height={48} />
        <ContextMenu body={<div><Button buttonStyle="button-primary" onClick={this.onTrySignOut} >Sign out</Button></div>} position="rightTop">
          <UserAvatar className="user-avatar" width={48} height={48} />
        </ContextMenu>
      </div>
    );
  }
}