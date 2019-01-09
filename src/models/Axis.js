import { observable } from 'mobx';

export default class Axis {  
  @observable display = true;
  @observable position = 'left';
  @observable offset = false;
  @observable scaleLabel = {
    display: true,
    labelString: "Example y label",
    lineHeight: 1.2,
    fontColor: '#97a5b7',
    fontFamily: 'Ubuntu',
    fontSize: 18,
    fontStyle: 'normal',
    padding: {
      top: 4,
      bottom: 4
    }
  };
  @observable gridLines = {
    display: true,
    color: '#38435a',
    // for radar chart
    circular: false,
    borderDash: true,
    lineWidth: 1,
    drawTicks: true,
    tickMarkLength: 5,
    zeroLineWidth: 1,
    zeroLineColor: '#38435a',
    zeroLineBorderDash: false,
    offsetGridLines: false
  };
  @observable ticks = {
    fontColor: "#97a5b7", 
    fontFamily: "Ubuntu",
    fontSize: 12,
    fontStyle: 'normal',
    reverse: false,
  }

  constructor(position='left') {
    this.position = position;
  }
}