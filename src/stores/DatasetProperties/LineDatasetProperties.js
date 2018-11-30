import { observable } from 'mobx';

export class LineDatasetPropertiesStore {  
  @observable label = 'First dataset';
  @observable xAxisID = undefined;
  @observable yAxisID = undefined;
  @observable backgroundColor = undefined;
  @observable borderColor = undefined;
  @observable borderWidth = undefined;
  @observable borderDash = undefined;
  @observable borderDashOffset = undefined;
  @observable borderCapStyle = 'butt';
  @observable borderJoinStyle = 'round';
  @observable cubicInterpolationMode = 'default';
  @observable fill = false;
  @observable lineTension = 0.4;
  @observable pointBackgroundColor = undefined;
  @observable pointBorderColor = undefined;
  @observable pointBorderWidth = undefined;
  @observable pointRadius = undefined;
  @observable pointRotation = undefined;
  @observable pointHitRadius = undefined;
  @observable pointHoverBackgroundColor = undefined;
  @observable pointHoverBorderColor = undefined;
  @observable pointHoverBorderWidth = undefined;
  @observable pointHoverRadius = undefined;
  @observable showLine = true;
  @observable spanGaps = false;
  @observable steppedLine = false;
}

const lineDatasetPropertiesStore = new LineDatasetPropertiesStore();

export default lineDatasetPropertiesStore;