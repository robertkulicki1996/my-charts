import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import './Button.scss';

export default class Button extends PureComponent {
  static propTypes = {
    /**
     * Button text color
     */
    textColor: PropTypes.oneOf(['dark', 'light','pink']),
    /**
     * Button style
     */
    buttonStyle: PropTypes.oneOf(['button-primary', 'button-link', 'button-social']),
    /**
     * React-passed children.
     */
    children: PropTypes.node,
    /**
     * Disabled property, properly styling button
     */
    disabled: PropTypes.bool,
    /**
     * onClick callback, should be properly bound to current view.
     * Noop by default.
     */
    onClick: PropTypes.func,
  };
  static defaultProps = {
    disabled: false,
    onClick: noop,
    children: null,
    textColor: 'light',
    buttonStyle: 'button-link',
  };

  render() {
    const {
      children,
      disabled,
      onClick,
      buttonStyle,
      textColor
    } = this.props;

    return (
      <button
        className={`button ${buttonStyle} ${textColor}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
}