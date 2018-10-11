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
    precision: PropTypes.number
  }
  render() {
    const { style, defaultValue, onChange, precision } = this.props;
    return (
      <RcInputNumber
        style={style}
        defaultValue={defaultValue}
        onChange={onChange}
        precision={precision}
      />
    );
  }
}