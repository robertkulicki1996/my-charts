import { observable } from 'mobx';

export class LineChartSettingsStore {
  // Observable current line chart object required to globaly update
  @observable lineChartObject = null;

  // Resizes the chart canvas when its container does
  @observable responsive = true;

  // Duration in milliseconds it takes to animate to new size after a resize event.
  @observable responsiveAnimationDuration = 0;

  // Maintain the original canvas aspect ratio (width / height) when resizing.
  @observable maintainAspectRatio = false;

  // Canvas background color
  @observable backgroundColor = {
    hex: '#293142',
    rgba: 'rgba(41,49,66,1)' 
  }

  // The padding to add inside the chart.
  @observable padding = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }

  // Animation on chart update
  @observable animation = {
    // The number of milliseconds an animation takes.
    duration: 1000,
    // Animation type
    easing: 'easeOutQuart'
  }

}

const lineChartSettingsStore = new LineChartSettingsStore();

export default lineChartSettingsStore;