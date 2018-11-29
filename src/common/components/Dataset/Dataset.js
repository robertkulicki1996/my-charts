import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { map } from 'lodash';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

import './Dataset.scss';

@observer
export default class Dataset extends Component {
  static propTypes = {
    /**
     * selected color
     */
    color: PropTypes.string,
    /**
     * dataset name
     */
    name: PropTypes.string
  }

  static defaultProps = {
    color: 'white',
    name: 'undefined dataset'
  }

  render() {
    const { color, name } = this.props;

    return (
      <Tooltip
        title={name}
        position="left"
        arrow={true}
        size="regular"
        trigger="click"
        theme="transparent"
      >
        <div className="dataset">
          {map(Array.from(Array(9).keys()), index => 
            <div 
              key={index} 
              className="dataset-item" 
              style={{backgroundColor: color}} 
            />
          )}
        </div>
      </Tooltip>
    );
  }
}