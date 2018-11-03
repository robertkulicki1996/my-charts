import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import RcInputNumber from 'rc-input-number';
import './InputNumber.scss';

@observer
export default class InputNumber extends Component {
  static propTypes = {
    /**
     * component style
     */
    style: PropTypes.object,
    /**
     * disable component
     */
    disabled: PropTypes.bool,
    /**
     * input value
     */
    value: PropTypes.number,
    /**
     * default value 
     */
    defaultValue: PropTypes.number,
    /**
     * onChange callback functions
     */
    onChange: PropTypes.fun,
    /**
     * precision number
     */
    precision: PropTypes.number,
    /**
     * step
     */
    step: PropTypes.number
  }
  render() {
    const { style, value, defaultValue, onChange, step, precision, disabled } = this.props;
    return (
      <RcInputNumber
        style={style}
        disabled={disabled}
        defaultValue={defaultValue}
        step={step}
        value={value}
        onChange={onChange}
        precision={precision}
      />
    );
  }
}