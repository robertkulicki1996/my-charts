import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Avatar from 'react-avatar';

import './AvatarWithName.scss';

@observer
export default class AvatarWithName extends Component {
  static propTypes = {
    /**
     * User displayed name
     */
    name: PropTypes.string,
    /**
     * User displayed email
     */
    email: PropTypes.string,
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
    email: '',
    avatarUrl: '',
    color: '#EB1E64',
    bottomBorder: false
  }
  
  render() {
    const { name, email, avatarUrl, color, bottomBorder } = this.props;

    return (
      <div className={`${`avater-with-name-wrapper`} ${bottomBorder && 'with-bottom-border'}` }>
        <Avatar 
          size="60" 
          round="20%"
          name={name} 
          src={avatarUrl} 
          color={`${color}`}
        />
        {name && <div className="name">{name}</div>}
        {email && <div className="email">{email}</div>}
      </div>
    );
  }
}