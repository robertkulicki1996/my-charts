import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import UserAvatar from 'react-user-avatar';

import './AvatarWithName.scss';

@observer
export default class AvatarWithName extends Component {
  static propTypes = {
    /**
     * User displayed name
     */
    name: PropTypes.string,
    /**
     * User avatar url
     */
    avatarUrl: PropTypes.string,
    /**
     * Logo background, default color is $color-brighterblue from variables
     */
    color: PropTypes.string,
    /**
     * Set bottom border
     */
    bottomBorder: PropTypes.string
  }

  static defaultProps = {
    name: '',
    avatarUrl: '',
    color: '#272f40',
    bottomBorder: false

  }
  
  render() {
    const { name, avatarUrl, color, bottomBorder } = this.props;

    return (
      <div className={`${`avater-with-name-wrapper`} ${bottomBorder && 'with-bottom-border'}` }>
        <UserAvatar size="48" name={name} src={avatarUrl} color={`${color}`}/>
        {name && <div className="name">{name}</div>}
      </div>
    );
  }
}