import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { DataStore } from '../../../stores/data';

import './Dataset.scss';

@inject('dataStore')
@observer
export default class Dataset extends Component {
  static propTypes = {
    /**
     * dataset index in table
     */
    datasetIndex: PropTypes.number,
    /**
     * data store
     */
    dataStore: PropTypes.instanceOf(DataStore).isRequired
  }

  @observable color = '';
  @observable label = '';

  @action
  componentDidMount() {
    const { dataStore, datasetIndex } = this.props;
    const datasetProperty = dataStore.getDatasetProperty(datasetIndex);
    this.color = datasetProperty.backgroundColor;
    this.label = datasetProperty.label;
  }

  render() {
    const { color, label } = this;
    return (
      <div className="dataset">
        <div 
          title={label} 
          className="dataset-item" 
          style={{ backgroundColor: color }} 
        />
      </div>
    );
  }
}