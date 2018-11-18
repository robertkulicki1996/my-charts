import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import './ColorInput.scss';

@observer
export default class ColorInput extends Component {
  static propTypes = {
    /**
     * selected color
     */
    color: PropTypes.string
  }

  render() {
    const { color } = this.props;
    return (
      <div className='color-input-wrapper'>
        <div className="color-circle" style={{backgroundColor: color}} />
        <span className="color-text" style={{color: '#272f40'}}>{color}</span>
      </div>
    );
  }
}