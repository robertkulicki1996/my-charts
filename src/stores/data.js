import Papa from 'papaparse';
import { observable, action } from 'mobx';
import { map } from 'lodash';

export class DataStore {
  // current chart data columns
  @observable columns = [];

  // current chart data rows
  @observable rows = [];

  // optional imported csv file (not parsed)
  @observable csvFile = null;

  @observable errors = [];

  // method to parse csv file to JSON and then to JS objects required to display in table
  @action.bound
  async parseFile(file) {
    await Papa.parse(file, {
      header: true,
      complete: results => {
        const { data, meta, errors } = results; 
        const { fields } = meta;
        this.columns = fields;
        this.errors = errors;
        map(data, row => {
          const rowObject = JSON.parse(JSON.stringify(row));
          this.rows.push(rowObject);
        })
      }
    });
  }
}

const dataStore = new DataStore();

export default dataStore;