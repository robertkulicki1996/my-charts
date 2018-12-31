import Papa from 'papaparse';
import { observable, action } from 'mobx';
// import { uniqueId, find, map } from 'lodash';

export class DataStore {

  // current chart data columns
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

  // current chart data rows
  @observable rows = [];

  // array of datasets with properties
  @observable chartDatasetsProperties = [];

  // optional imported csv file (not parsed)
  @observable csvFile = null;

  // errors from papaparse
  @observable errors = [];

  getDatasetProperty(index) {
    return this.chartDatasetsProperties[index];
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