import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import './SectionHeader.scss';

@observer
export default class SectionHeader extends Component {
  static propTypes = {
    /**
     * section title
     */
    title: PropTypes.string,
  }
  render() {
    const { title } = this.props;
    return (
      <div className="section-header">
        <span>{title}</span>
        <div className="icon">&#x276F;</div>
      </div>
    );
  }
}