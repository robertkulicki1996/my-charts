import firebase from 'firebase';
import Papa from 'papaparse';
import { observable, action } from 'mobx';
import { map, forEach, find } from 'lodash';
import uniqueString from 'unique-string';

import authStore from './auth';
import lineChartSettingsStore from './ChartSettings/LineChartSettings';

export class DataStore {
  @observable categories = [];

  @observable datasets = [];

  @observable rows = [];

  // Array of datasets with properties
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
  async getUserCharts(){
    const userId = authStore.authUser.uid;
    try {
      const resp = await firebase.database().ref(`users/+${userId}/charts`).once('value')
      return resp.val();
    } catch(e){
      window.console.error(e);
    }
  }

  @action.bound
  async createChart(){
    const chartId = uniqueString()
    const userId = authStore.authUser.uid;
    const createdDate = Date();
    await firebase.database().ref(`users/+${userId}/charts/${chartId}`).set({
      id: chartId,
      created_at: createdDate,
      last_modification: createdDate,
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
        last_modification: Date(),
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