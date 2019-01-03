import { observable, action } from 'mobx';

export class CommonStore {

  // canvas reference
  @observable canvasRef = null;
    
  // Observable current line chart object required to globaly update
  @observable lineChartObject = null;

  // Set initial values to chart object
  @action
  resetChartState() {
    const { lineChartObject } = this;
    lineChartObject.data.labels = [];
    lineChartObject.data.datasets = [];
    this.updateChart();
  }

  // Update current chart
  @action.bound
  updateChart() {
    this.lineChartObject.chart.update();
  }

  // Add new dataset - chart with data and properites
  @action
  addDataset(dataset){
    this.lineChartObject.data.datasets.push(dataset);
    this.updateChart();
  }
}

const commonStore = new CommonStore();

export default commonStore;