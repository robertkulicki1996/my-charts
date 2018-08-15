import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import UserAvatar from '../../common/icons/UserAvatar.svg';

import './AvatarWithName.scss';

@observer
export default class AvatarWithName extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  static defaultPropTypes = {
    name: ''
  }
  
  render() {
    const { name } = this.props;
    
    return (
      <div className="avater-with-name-wrapper">
        <UserAvatar className="user-avatar" width={48} height={48} />
        {name && <div className="name">{name}</div>}
      </div>
    );
  }
}