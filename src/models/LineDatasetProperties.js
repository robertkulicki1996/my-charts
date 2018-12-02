import { observable } from 'mobx';

export class LineDatasetProperties {  
  @observable label = 'First dataset';
  @observable backgroundColor = 'blue';
  @observable borderColor = 'black';
  @observable borderWidth = 3;
  @observable borderCapStyle = 'butt';
  @observable borderJoinStyle = 'round';
  @observable cubicInterpolationMode = 'default';
  @observable fill = false;
  @observable lineTension = 0.4;
  @observable pointBackgroundColor = 'white';
  @observable pointBorderColor = 'white';
  @observable pointBorderWidth = 1;
  @observable pointRadius = 3;
  @observable pointRotation = 0;
  @observable pointHitRadius = 1;
  @observable pointHoverBackgroundColor = 'black';
  @observable pointHoverBorderColor = 'black';
  @observable pointHoverBorderWidth = 1;
  @observable pointHoverRadius = 4;
  @observable showLine = true;
  @observable spanGaps = false;
  @observable steppedLine = false;
}

export default LineDatasetProperties;