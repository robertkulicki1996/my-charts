import { observable } from 'mobx';


export class LineChartSettingsStore {
  @observable canvasRef = null;
  
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
    left: 30,
    right: 60,
    top: 30,
    bottom: 30
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

  // The tooltip configuration
  @observable tooltips = {
    // Are on-canvas tooltips enabled
    enabled: true,
    // Sets which elements appear in the tooltip.
    mode: 'nearest',
    // if true, the tooltip mode applies only when the mouse position intersects with an element. If false, the mode will be applied at all times.
    intersect: true,
    // The mode for positioning the tooltip. 
    position: 'average',
    // ---> Callbacks section 
    callbacks: {
      // Text before tooltip title
      beforeTitle: '',
      // Returns text to render before the body section.
      beforeBody: '',
      // Returns the colors to render for the tooltip item
      labelColor: {
        borderColor: 'blue',
        backgroundColor: 'red'
      },
      // Returns the colors for the text of the label for the tooltip item.
      labelTextColor: 'red',
    },
    // ---> End callbacks section
    // Background color of the tooltip.
    backgroundColor: 'black',
    // Title font
    titleFontFamily: 'Arial',
    // Title font size
    titleFontSize: 12,
    // Title font style
    titleFontStyle: 'bold',
    // Title font color
    titleFontColor: '#ffffff',
    // Spacing to add to top and bottom of each title line.
    titleSpacing: 2,
    // 	Margin to add on bottom of title section.
    titleMarginBottom: 6,
    // Body line font
    bodyFontFamily: 'Arial',
    // Body font size
    bodyFontSize: 12,
    // Body font style
    bodyFontStyle: 'normal',
    // Body font color
    bodyFontColor: '#ffffff',
    // Spacing to add to top and bottom of each tooltip item.
    bodySpacing: 2,
    // Padding to add on left and right of tooltip.
    xPadding: 6,
    // Padding to add on top and bottom of tooltip.
    yPadding: 6,
    // 	Extra distance to move the end of the tooltip arrow away from the tooltip point.
    caretPadding: 2,
    // Size, in px, of the tooltip arrow.
    caretSize: 5,
    // Radius of tooltip corner curves.
    cornerRadius: 6,
    // Color to draw behind the colored boxes when multiple items are in the tooltip
    multiKeyBackground: '#ffffff',
    // if true, color boxes are shown in the tooltip
    displayColors: true,
    // Color of the border
    borderColor: 'black',
    // Size of the border
    borderWidth: 0
  }

  // Point Configuration
  @observable point = {
    
  }
}

const lineChartSettingsStore = new LineChartSettingsStore();

export default lineChartSettingsStore;