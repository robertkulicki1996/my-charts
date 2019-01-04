import Papa from 'papaparse';
import { observable, action } from 'mobx';
import { map } from 'lodash';
import { persist } from 'mobx-persist';
import LineDatasetProperties from '../models/LineDatasetProperties';

export class DataStore {

  // Current chart data columns
  @observable columns = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020'
  ];

  // Current chart data rows
  @observable rows = [];

  // Array of datasets with properties
  @persist('list', LineDatasetProperties)
  @observable chartDatasetsProperties = [];

  // Optional imported csv file (not parsed)
  @observable csvFile = null;

  // Errors from papaparse
  @observable errors = [];

  // Add new row
  @action.bound
  addRow(row) {
    this.rows.push(row);
  }

  @action.bound
  addDatasetProperties(datasetProperties) {
    this.chartDatasetsProperties.push(datasetProperties);
  }

  // Return dataset properties by index
  @action.bound
  getDatasetProperty(index) {
    return this.chartDatasetsProperties[index];
  }

  // Return datasets data with labels
  @action.bound
  getPreparedRowsForReportTable() {
    const { rows, chartDatasetsProperties } = this;
    const preparedRows = [];
    map(rows, (row, index) => {
      delete row.id;
      preparedRows.push([
        chartDatasetsProperties[index].label,
        ...Object.values(row)]
      );
    });
    return preparedRows;
  }

  // Set initial state
  @action.bound
  resetDataState() {
    this.columns.clear();
    this.rows.clear();
    this.errors.clear()
    this.chartDatasetsProperties.clear();
  }

  @action.bound
  async parseFile(file) {
    return new Promise((complete, error) => {
      Papa.parse(file, {
        header: true,
        complete, 
        error
      });
    });
  }

}

const dataStore = new DataStore();

export default dataStore;