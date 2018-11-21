import { observable } from 'mobx';
import ChartSettingsStore from './ChartSettings';

export class BarChartSettingsStore extends ChartSettingsStore {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  
  // Rectangle elements are used to represent the bars in a bar chart.
  @observable rectangle = {
    // Bar fill color.
    backgroundColor: '#ffffff',
    // Bar stroke width.
    borderWidth: 0,
    // 	Bar stroke color
    borderColor: '#ffffff',
    // Skipped (excluded) border: 'bottom', 'left', 'top' or 'right'.
    borderSkipped: 'bottom'
  }

}

const barChartSettingsStore = new BarChartSettingsStore();

export default barChartSettingsStore;