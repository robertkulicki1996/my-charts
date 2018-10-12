import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import './ColorPickerSectionHeader.scss';

@observer
export default class ColorSectionHeader extends Component {
  static propTypes = {
    /**
     * section title
     */
    title: PropTypes.string,
    /**
     * selected color
     */
    color: PropTypes.string
  }

  render() {
    const { title, color } = this.props;
    return (
      <div className='color-section-header'>
        <span className="option-as-header">{title}</span>
        <div className="color-button">
          <div className="color" style={{backgroundColor: color}}></div>
        </div>
      </div>
    );
  }
}