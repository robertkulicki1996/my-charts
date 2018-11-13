import { observable } from 'mobx';

export class LineChartSettingsStore {
  // observable current line chart object required to globaly update
  @observable lineChartObject = null;

  // resizes the chart canvas when its container does
  @observable responsive = true;

  // duration in milliseconds it takes to animate to new size after a resize event.
  @observable responsiveAnimationDuration = 0;

  // maintain the original canvas aspect ratio (width / height) when resizing.
  @observable maintainAspectRatio = false;

  // canvas background color
  @observable backgroundColor = {
    hex: '#293142',
    rgba: 'rgba(41,49,66,1)' 
  }

  // the padding to add inside the chart.
  @observable padding = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }

}

const lineChartSettingsStore = new LineChartSettingsStore();

export default lineChartSettingsStore;