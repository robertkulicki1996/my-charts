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

  // The chart legend displays data about the datasets that are appearing on the chart.
  @observable legend = {
    // Is the legend shown
    display: true,
    // Position of the legend - 'top', 'right, 'bottom', 'left'
    position: 'top',
    // The legend label
    labels: {
      // Width of coloured box
      boxWidth: 40,
      // Size of text
      fontSize: 12,
      // Font style of text
      fontStyle: 'normal',
      // Color of text
      fontColor: '#ffffff',
      // Font family of legend text
      fontFamily: "Arial",
      // Padding between rows of colored boxes
      padding: 10,
      // Label style will match corresponding point style (size is based on fontSize, boxWidth is not used in this case).
      usePointStyle: false
    },
    // Marks that this box should take the full width of the canvas (pushing down other boxes). This is unlikely to need to be changed in day-to-day use.
    fullWidth: true,
    // Legend will show datasets in reverse order.
    reverse: false,
  }

  // The chart title defines text to draw at the top of the chart.
  @observable title = {
    // Is the title shown
    display: false,
    // Position of title
    position: 'top',
    // Font size
    fontSize: 12,
    // Font family of legend text
    fontFamily: "Arial",
    // Font style of text
    fontStyle: 'normal',
    // Color of text
    fontColor: '#ffffff',
    // Height of an individual line of text 
    lineHeight: 1.2,
    // Title text to display. If specified as an array, text is rendered on multiple lines.
    text: 'Example title'
  }
}

const lineChartSettingsStore = new LineChartSettingsStore();

export default lineChartSettingsStore;