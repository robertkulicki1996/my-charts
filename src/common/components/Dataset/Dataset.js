import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { map } from 'lodash';

import './Dataset.scss';

@observer
export default class Dataset extends Component {
  static propTypes = {
    /**
     * selected color
     */
    color: PropTypes.string
  }

  static defaultProps = {
    color: 'white'
  }

  render() {
    const { color } = this.props;

    return (
      <div className="dataset">
        <div className="dataset-item" style={{ backgroundColor: color }} />
      </div>
    );
  }
}