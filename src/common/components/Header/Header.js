import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import AppLogoIcon from '../../icons/logo.svg';
import UserAvatar from '../../icons/UserAvatar.svg';

import './Header.scss';

import ContextMenu from '../ContextMenu/ContextMenu';

@observer
export default class Header extends Component {
  static propTypes = {
    leftSide: PropTypes.node
  };
  
  static defaultProps = {
    leftSide: null
  };
  

  render() {
  
    return (
      <div className="header">
        <AppLogoIcon width={48} height={48} />
        <ContextMenu body={<div><div>Menu item 1</div><div>Menu item 1</div></div>} position="rightTop">
          <UserAvatar className="user-avatar" width={48} height={48} />
        </ContextMenu>
      </div>
    );
  }
}