import Papa from 'papaparse';
import { observable, action } from 'mobx';
import { uniqueId } from 'lodash';

export class DataStore {
  // current chart data columns
  @observable columns = [
    'column1',
    'column2',
    'column3',
    'column4'
  ];

  // current chart data rows
  @observable rows = [
    {
      id: uniqueId('row_'),
      column1: '110',
      column2: '320',
      column3: '320',
      column4: '420'
    },
    {
      id: uniqueId('row_'),
      column1: '150',
      column2: '420',
      column3: '330',
      column4: '420'
    },
    {
      id: uniqueId('row_'),
      column1: '150',
      column2: '320',
      column3: '340',
      column4: '421'
    },
    {
      id: uniqueId('row_'),
      column1: '123',
      column2: '320',
      column3: '93',
      column4: '421'
    },
    {
      id: uniqueId('row_'),
      column1: '10',
      column2: '54',
      column3: '33',
      column4: '90'
    },
    {
      id: uniqueId('row_'),
      column1: '123',
      column2: '18',
      column3: '93',
      column4: '749'
    },
    {
      id: uniqueId('row_'),
      column1: '32',
      column2: '54',
      column3: '254',
      column4: '64'
    }
  ];

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