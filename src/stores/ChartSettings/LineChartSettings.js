import { observable } from 'mobx';
import ChartSettingsStore from './ChartSettings';

export class LineChartSettingsStore extends ChartSettingsStore {  
  // Line configuration - line charts
  @observable line = {
    // Bézier curve tension (0 for no Bézier curves).
    tension: 0.4,
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderColor: '#ffffff',
    // "butt"
    // The ends of lines are squared off at the endpoints. Default value.
    // "round"
    // The ends of lines are rounded.
    // "square"
    // The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness.
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0,
    // There are three possible values for this property: "round", "bevel", and "miter". The default is "miter".
    borderJoinStyle: 'miter',
    // True to keep Bézier control inside the chart, false for no restriction.
    capBezierPoints: true,
    // Fill location: 'zero', 'top', 'bottom', true (eq. 'zero') or false (no fill).
    fill: true,
    // True to show the line as a stepped line (tension will be ignored).
    stepped: false
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

const lineChartSettingsStore = new LineChartSettingsStore();

export default lineChartSettingsStore;