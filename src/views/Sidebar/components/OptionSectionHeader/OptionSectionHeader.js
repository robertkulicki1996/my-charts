import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import './OptionSectionHeader.scss';

@observer
export default class OptionSectionHeader extends Component {
  static propTypes = {
    /**
     * section title
     */
    title: PropTypes.string,
  }

  render() {
    const { title } = this.props;
    return (
      <div className='option-section-header'>
        <span className="option-as-header">{title}</span>
        <div className="icon">&#x276F;</div>
      </div>
    );
  }
}