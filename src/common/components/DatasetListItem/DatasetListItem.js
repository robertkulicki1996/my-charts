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

  @observable color = '';
  @observable label = '';

  @action.bound
  setInitialValue() {
    const { dataStore, datasetIndex } = this.props;
    const datasetProperty = dataStore.getDatasetProperty(datasetIndex);
    if(datasetProperty.fill === true) {
      this.color = datasetProperty.backgroundColor;
    } else {
      this.color = datasetProperty.borderColor;
    }
    this.label = datasetProperty.label;
  }

  @action
  componentDidMount() {
    this.setInitialValue();
  }

  @action
  componentWillReceiveProps() {
    this.setInitialValue();
  }

  render() {
    const { color, label } = this;

    return (
      <div className="dataset-list-item">
        <div 
          title={label} 
          className='dataset-icon'
          style={{ backgroundColor: color }} 
        />
        <div className='dataset-label'>{label}</div>
      </div>
    );
  }
}