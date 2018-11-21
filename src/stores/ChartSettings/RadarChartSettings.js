import { observable } from 'mobx';

import ChartSettingsStore from './ChartSettings';

export class RadarChartSettingsStore extends ChartSettingsStore {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
}

const radarChartSettingsStore = new RadarChartSettingsStore();

export default radarChartSettingsStore;