import Papa from 'papaparse';
import { observable, action } from 'mobx';

export class DataStore {
  // current chart data columns
  @observable columns = [];

  // current chart data rows
  @observable rows = [];

  // optional imported csv file (not parsed)
  @observable csvFile = null;

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