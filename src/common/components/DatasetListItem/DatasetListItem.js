import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { DataStore } from '../../../stores/data';
import './DatasetListItem.scss';

@inject('dataStore')
@observer
export default class DatasetListItem extends Component {
  static propTypes = {
    /**
     * dataset index
     */
    datasetIndex: PropTypes.number,
    dataStore: PropTypes.instanceOf(DataStore).isRequired
  }

  @observable datasetProperty = {};

  @action
  componentDidMount(){
    const { dataStore, datasetIndex } = this.props;
    this.datasetProperty = dataStore.getDatasetProperty(datasetIndex);
  }

  @action
  componentWillReceiveProps() {
    const { dataStore, datasetIndex } = this.props;
    this.datasetProperty = dataStore.getDatasetProperty(datasetIndex);
  }

  render() {
    const { datasetProperty } = this;

    return (
      <div className="dataset-list-item">
        <div 
          title={datasetProperty.label} 
          className='dataset-icon'
          style={{ backgroundColor: datasetProperty.backgroundColor }} 
        />
        <div className='dataset-label'>{datasetProperty.label}</div>
      </div>
    );
  }
}