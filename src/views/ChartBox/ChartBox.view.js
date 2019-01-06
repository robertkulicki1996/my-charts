import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Bind } from 'lodash-decorators';
import { action } from 'mobx';

import Chart from 'chart.js';

// stores
import { LineChartSettingsStore } from '../../stores/ChartSettings/LineChartSettings';
import { CommonStore } from '../../stores/common';

// styles
import './ChartBox.view.scss';

@withRouter
@inject('commonStore','lineChartSettingsStore')
@observer
export default class ChartBox extends Component {
  static propTypes = {
    commonStore: PropTypes.instanceOf(CommonStore).isRequired,
    lineChartSettingsStore: PropTypes.instanceOf(LineChartSettingsStore).isRequired
  }

  constructor(props) {
    super(props);
    this.lineChartRef = React.createRef();
    this.lineChart = null;
  }

  componentDidMount() {
    this.context = this.lineChartRef.current.getContext('2d');
    this.init();
  }
 
  componentWillMount() {
    const { lineChartSettingsStore } = this.props;
    Chart.pluginService.register({
      beforeDraw: chartInstance => {
        var ctx = chartInstance.chart.ctx;
        ctx.fillStyle = lineChartSettingsStore.backgroundColor.rgba;
        ctx.fillRect(0, 0, chartInstance.width, chartInstance.height);
      }
    });
  }

  @action.bound
  init() {
    this.lineChart = new Chart(this.context,{
      type: 'line',
      data: {
        labels: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        datasets: []
      },
      options: {
        scaleFontColor: 'white',
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        },
        layout: {
          padding: {
            top: this.props.lineChartSettingsStore.padding.top,
            left: this.props.lineChartSettingsStore.padding.left,
            right: this.props.lineChartSettingsStore.padding.right,
            bottom: this.props.lineChartSettingsStore.padding.bottom,
          }
        },
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 40,
            fontColor: "white",
            fontStyle: 'normal',
            fontFamily: 'Ubuntu',
            fontSize: 12,
            padding: 10,
            usePointStyle: true,
          },
          reverse: false,
          fullWidth: true
        },
        title: {
          display: true,
          position: 'top',
          fontSize: 20,
          fontFamily: "Arial",
          fontStyle: 'normal',
          fontColor: '#ffffff',
          lineHeight: 1.2,
          text: 'Example title'
        },
        tooltips: {
          enabled: true,
          mode: 'nearest',
          intersect: true,
          position: 'average',
          callbacks: {
            beforeTitle: () => {
              return 'sdsd'
            },
            labelColor: () => {
              return {
                borderColor: this.props.lineChartSettingsStore.tooltips.callbacks.borderColor,
                backgroundColor: this.props.lineChartSettingsStore.tooltips.callbacks.backgroundColor
              }
            }
          },
          backgroundColor: 'blue'
        },
        // scale: {
        //  display: true,
        // }, 
        scales: {
          xAxes: [{ 
            display: true,
            position: 'bottom',
            offset: false,
            scaleLabel: {
              display: true,
              labelString: "Example x label",
              lineHeight: 1.2,
              fontColor: '#97a5b7',
              fontFamily: 'Ubuntu',
              fontSize: 18,
              fontStyle: 'normal',
              padding: {
                top: 4,
                bottom: 4
              }
            },
            gridLines: {
              display: true,
              color: '#38435a',
              // for radar chart
              circular: false,
              borderDash: [5,5],
              lineWidth: 1,
              drawTicks: true,
              tickMarkLength: 5,
              zeroLineWidth: 1,
              zeroLineColor: '#38435a',
              zeroLineBorderDash: [],
              offsetGridLines: false
            },
            ticks: {
              fontColor: "#97a5b7", 
              fontFamily: "Ubuntu",
              fontSize: 12,
              fontStyle: 'normal',
              reverse: false,
              stepSize: 1
            },
          }],
          yAxes: [{
            display: true,
            position: 'left',
            offset: false,
            scaleLabel: {
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
            },
            gridLines: {
              display: true,
              color: '#38435a',
              // for radar chart
              circular: false,
              borderDash: [5,5],
              lineWidth: 1,
              drawTicks: true,
              tickMarkLength: 5,
              zeroLineWidth: 1,
              zeroLineColor: '#38435a',
              zeroLineBorderDash: [],
              offsetGridLines: false
            },
            ticks: {
              fontColor: "#97a5b7", 
              fontFamily: "Ubuntu",
              fontSize: 12,
              fontStyle: 'normal',
              reverse: false,
            }
          }],
        }
      },
    });
    // set observable canvas node
    this.props.commonStore.canvasRef = this.lineChartRef;
    // set observable chart object
    this.props.commonStore.lineChartObject = this.lineChart;
  }

  @Bind()
  toggleChart() {
    this.lineChart.destroy();
    this.init();
  }

  render() {
    return (
      <canvas ref={this.lineChartRef} />
    );
  }
}