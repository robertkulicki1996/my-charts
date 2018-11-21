import { observable } from 'mobx';

import ChartSettingsStore from './ChartSettings';

export class BubbleChartSettingsStore extends ChartSettingsStore {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  
  // Point configuration - line / bubble charts
  @observable point = {
    // Point radius.
    radius: 3,
    // Point style
    pointStyle: 'circle',
    // Point rotation (in degrees).
    rotation: 0,
    // Point fill color.
    backgroundColor: '#ffffff',
    // Point stroke width.
    borderWidth: 1,
    // Point stroke color.
    borderColor: '#ffffff',
    // Extra radius added to point radius for hit detection.
    hitRadius: 1,
    // Point radius when hovered.
    hoverRadius: 4,
    // Stroke width when hovered.
    hoverBorderWidth:1
  }
}

const bubbleChartSettingsStore = new BubbleChartSettingsStore();

export default bubbleChartSettingsStore;