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
        datasets: [
          {
            label: 'My first dataset',
            // fill: false,
            // lineTension: 0.5,
            // backgroundColor: 'blue',
            // borderColor: '#fff',
            // borderCapStyle: 'butt',
            // borderDash: [],
            // borderDashOffset: 0.0,
            // borderJoinStyle: 'red',
            // pointBorderColor: 'white',
            // pointBackgroundColor: '#fff',
            // pointBorderWidth: 1,
            // pointHoverRadius: 5,
            // pointHoverBackgroundColor: '#fff',
            // pointHoverBorderColor: 'blue',
            // pointHoverBorderWidth: 2,
            // pointRadius: 1,
            // pointHitRadius: 10,
            data: [100,200,300,400,500,600,700,800,900,1000,1100],
          },
          {
            label: 'My second dataset',
            // fill: false,
            // lineTension: 0.5,
            // backgroundColor: 'blue',
            // borderColor: '#fff',
            // borderCapStyle: 'butt',
            // borderDash: [],
            // borderDashOffset: 0.0,
            // borderJoinStyle: 'red',
            // pointBorderColor: 'white',
            // pointBackgroundColor: '#fff',
            // pointBorderWidth: 1,
            // pointHoverRadius: 5,
            // pointHoverBackgroundColor: '#fff',
            // pointHoverBorderColor: 'blue',
            // pointHoverBorderWidth: 2,
            // pointRadius: 1,
            // pointHitRadius: 10,
            data: [1200,1100,1000,400,500,600,700,800,900,1000,1100],
          }
        ]
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
        elements: {
          point: {
            pointStyle: 'circle',
            backgroundColor: this.props.lineChartSettingsStore.point.backgroundColor,
            hoverBackgroundColor: '#456567'
          }
        },
        scales: {
          xAxes: [{ 
            gridLines: {
                display: true,
            },
            ticks: {
              fontColor: "#CCC", // this here
            },
          }],
          yAxes: [{
            gridLines: {
                display: true,
            },
            ticks: {
              fontColor: "#CCC", // this here
            },
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