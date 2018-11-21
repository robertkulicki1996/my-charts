import { observable } from 'mobx';

import ChartSettingsStore from './ChartSettings';

export class DoughnutAndPieChartSettingsStore extends ChartSettingsStore {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // Arcs are used in the polar area, doughnut and pie charts.
  @observable arc = {
    // Arc fill color.
    backgroundColor: '#ffffff',
    // Arc stroke color.
    borderColor: '#ffffff',
    // Arc stroke width.
    borderWidth: 2
  }
}

const doughnutAndPieChartSettingsStore = new DoughnutAndPieChartSettingsStore();

export default doughnutAndPieChartSettingsStore;