import firebase from 'firebase';
import Papa from 'papaparse';
import { observable, action } from 'mobx';
import { map, forEach } from 'lodash';

import authStore from './auth';
import lineChartSettingsStore from './ChartSettings/LineChartSettings';

export class DataStore {

  @observable categories = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015'
  ];


  @observable datasets = [
    {
      label: 'Datset-1',
      dataKey: 'dataset-1'
    },
    {
      label: 'Datset-2',
      dataKey: 'dataset-2'
    },
    {
      label: 'Datset-3',
      dataKey: 'dataset-3'
    }
  ];

  @observable rows = [
    {
      'category': '2010',
      'dataset-1': '100',
      'dataset-2': '200',
      'dataset-3': '300'
    },
    {
      'category': '2011',
      'dataset-1': '1200',
      'dataset-2': '2200',
      'dataset-3': '3200'
    },
    {
      'category': '2012',
      'dataset-1': '1300',
      'dataset-2': '2300',
      'dataset-3': '3300'
    },
    {
      'category': '2013',
      'dataset-1': '1400',
      'dataset-2': '2400',
      'dataset-3': '3400'
    },
    {
      'category': '2014',
      'dataset-1': '100',
      'dataset-2': '200',
      'dataset-3': '300'
    },
    {
      'category': '2015',
      'dataset-1': '1200',
      'dataset-2': '2200',
      'dataset-3': '3200'
    },
    {
      'category': '2016',
      'dataset-1': '1400',
      'dataset-2': '2400',
      'dataset-3': '3400'
    },
    {
      'category': '2017',
      'dataset-1': '100',
      'dataset-2': '200',
      'dataset-3': '300'
    },
    {
      'category': '2018',
      'dataset-1': '1200',
      'dataset-2': '2200',
      'dataset-3': '3200'
    },
    {
      'category': '2019',
      'dataset-1': '1400',
      'dataset-2': '2400',
      'dataset-3': '3400'
    },
    {
      'category': '2020',
      'dataset-1': '100',
      'dataset-2': '200',
      'dataset-3': '300'
    },
    {
      'category': '2021',
      'dataset-1': '1200',
      'dataset-2': '2200',
      'dataset-3': '3200'
    }
  ]


  // Array of datasets with properties
  @observable chartDatasetsProperties = [{
    backgroundColor:'#eb1e64',
    label: 'My dataset',
    borderColor: '#eb1e64'
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

  @action
  async saveChart() {
    const userData = firebase.database().ref('charts');
    const userId = authStore.authUser.uid;


    await firebase.database().ref(`charts`).set({
      userId,
      chartData: {
        rows: this.rows.slice(),
        columns: this.columns.slice(),
        datasetsProperties: this.chartDatasetsProperties.slice(),
        options: lineChartSettingsStore
      }
    });
    await userData.on("value", data => {
        console.log(data.val());
    }, error => {
        console.log("Error: " + error.code);
    });
  }

}

const dataStore = new DataStore();

export default dataStore;