import Papa from 'papaparse';
import { observable, action } from 'mobx';
import { uniqueId } from 'lodash';

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
  @observable rows = [
    {
      id: uniqueId('row_'),
      '2010': '100',
      '2011': '200',
      '2012': '300',
      '2013': '400',
      '2014': '500',
      '2015': '600',
      '2016': '700',
      '2017': '800',
      '2018': '900',
      '2019': '1000',
      '2020': '1100',

    },
    {
      id: uniqueId('row_'),
      '2010': '200',
      '2011': '400',
      '2012': '600',
      '2013': '800',
      '2014': '1000',
      '2015': '1200',
      '2016': '1400',
      '2017': '1600',
      '2018': '1800',
      '2019': '2000',
      '2020': '2200',
    },
  ];

  // array of datasets
  @observable chartDatasetsProperties = [];

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