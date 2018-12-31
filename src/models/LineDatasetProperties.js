import { observable } from 'mobx';

export class LineDatasetProperties {  
  @observable label = 'Example dataset';
  @observable backgroundColor = '#3308EB';
  @observable borderColor = '#ffffff';
  @observable borderWidth = 2;
  @observable borderCapStyle = 'butt';
  @observable borderJoinStyle = 'round';
  @observable cubicInterpolationMode = 'default';
  @observable fill = false;
  @observable lineTension = 0.4;
  @observable pointBackgroundColor = '#ffffff';
  @observable pointBorderColor = '#ffffff';
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

  constructor(
    label='Example dataset',
    borderColor='#3308EB'
  ) {
    this.label = label;
    this.borderColor = borderColor;
    this.backgroundColor = borderColor;
  }
}

export default LineDatasetProperties;