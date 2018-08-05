import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppLogoIcon from '../../icons/logo.svg';
import UserAvatar from '../../icons/UserAvatar.svg';
import './Header.scss';

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
        <UserAvatar width={54} height={54} onClick={() => console.log("clicked")}/>
      </div>
    );
  }
}