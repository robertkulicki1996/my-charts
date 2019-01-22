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
    return (
      <div className="dataset">
        <div 
          className='dataset-item-small'
          style={{ backgroundColor: this.datasetProperty.backgroundColor }} 
        />
      </div>
    );
  }
}