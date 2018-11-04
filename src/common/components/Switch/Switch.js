import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

// Switch component
import RcSwitch from 'rc-switch';
import 'rc-switch/assets/index.css';

import './Switch.scss';

@observer
export default class Switch extends Component {
  static propTypes = {
    /**
     * onChange callback functions
     */
    onChange: PropTypes.fun,
    /**
     * disabled state 
     */
    disabled: PropTypes.bool,
    /**
     * Swicth checked value
     */
    checked: PropTypes.bool,
    /**
     * checkedChilderen node
     */
    checkedChildren: PropTypes.node,
    /**
     * uncheckedChildren node
     */
    uncheckedChildren: PropTypes.node
  }
  render() {
    const { onChange, checked, disabled, checkedChildren, uncheckedChildren } = this.props;
    return (
      <RcSwitch
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        checkedChildren={checkedChildren}
        unCheckedChildren={uncheckedChildren}
      />
    );
  }
}