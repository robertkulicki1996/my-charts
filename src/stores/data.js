import firebase from 'firebase';
import Papa from 'papaparse';
import { observable, action } from 'mobx';
import { map, forEach, find } from 'lodash';
import uniqueString from 'unique-string';

import authStore from './auth';
import lineChartSettingsStore from './ChartSettings/LineChartSettings';

export class DataStore {

  @observable categories = [
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
    '2020',
    '2021'
  ];


  @observable datasets = [{
      label: 'Datset 1',
      dataKey: 'dataset_1'
    }
  ];

  @observable rows = [
    {
      category: '2010',
      dataset_1: '100',
      dataset_2: '200',
      dataset_3: '300'
    }
  ]


  // Array of datasets with properties
  @observable chartDatasetsProperties = [{
    label: 'Dataset 1',
    borderColor: 'red'
  }];

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

  @action.bound
  getDatasetLabel(key) {
    const dataset = find(this.datasets, {dataKey: key});
    return dataset.label;
  }

  // Return dataset properties by index
  @action.bound
  getDatasetProperty(index) {
    return this.chartDatasetsProperties[index];
  }

  // Return list of datasets labels
  @action.bound
  getDatasetsLabelsWithColors(){
    const labels = [];
    forEach(this.chartDatasetsProperties, (properties) => {
      labels.push({
        label: properties.label,
        backgroundColor: properties.borderColor
      })
    });
    return labels;
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
    this.categories.clear();
    this.datasets.clear();
    this.rows.clear();
    this.errors.clear()
    this.chartDatasetsProperties.clear();
    this.csvFile = null;
  }

  @action.bound
  async parseFile(file) {
    return new Promise((complete, error) => {
      Papa.parse(file, {
        header: false,
        complete, 
        error
      });
    });
  }

  @action.bound
  async createChart(){
    const chartId = uniqueString()
    const userId = authStore.authUser.uid;
    await firebase.database().ref(`users/+${userId}/charts/${chartId}`).set({
      created_at: Date.now(),
      last_modification: Date.now(),
      type: lineChartSettingsStore.type,
      user_id: userId,
      chart_data: {
        description: 'description',
        categories: this.categories.slice(),
        rows: this.rows.slice(),
        datasets: this.datasets.slice(),
        datasetsProperties: this.chartDatasetsProperties.slice(),
        options: lineChartSettingsStore
      }
    });
    return chartId;
  }

  @action.bound
  async updateChart(chartId){
    const userId = authStore.authUser.uid;
    await firebase.database().ref(`users/+${userId}/charts/${chartId}`).update({
      [chartId]: {
        last_modification: Date.now(),
        type: lineChartSettingsStore.type,
        chart_data: {
          description: 'description',
          categories: this.categories.slice(),
          rows: this.rows.slice(),
          datasets: this.datasets.slice(),
          datasetsProperties: this.chartDatasetsProperties.slice(),
          options: lineChartSettingsStore
        }
      }
    });
  }

  @action.bound
  async deleteChart(chartId){
    const userId = authStore.authUser.uid;
    await firebase.database().ref(`users/+${userId}/charts/${chartId}`).update({
      [chartId]: null
    });
  }

}

const dataStore = new DataStore();

export default dataStore;