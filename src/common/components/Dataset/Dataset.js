import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { DataStore } from '../../../stores/data';
import './Dataset.scss';

@inject('dataStore')
@observer
export default class Dataset extends Component {
  static propTypes = {
    /**
     * dataset index
     */
    datasetIndex: PropTypes.number,
    dataStore: PropTypes.instanceOf(DataStore).isRequired
  }

  render() {
    const { dataStore, datasetIndex } = this.props;
    const datasetProperty = dataStore.getDatasetProperty(datasetIndex);

    return (
      <div className="dataset">
        <div 
          title={datasetProperty.label}
          className='dataset-item-small'
          style={{ backgroundColor: datasetProperty.backgroundColor }} 
        />
      </div>
    );
  }
}