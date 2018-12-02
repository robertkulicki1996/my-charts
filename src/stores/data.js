import Papa from 'papaparse';
import { observable, action } from 'mobx';
// import { uniqueId } from 'lodash';

export class DataStore {
  // current chart data columns
  @observable columns = [];

  // current chart data rows
  @observable rows = [];

  // array of datasets
  @observable chartDatasets = [];

  // optional imported csv file (not parsed)
  @observable csvFile = null;

  // errors from papaparse
  @observable errors = [];

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