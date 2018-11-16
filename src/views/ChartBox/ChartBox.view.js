import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Bind } from 'lodash-decorators';
import { action } from 'mobx';
import Chart from 'chart.js';
import {  LineChartSettingsStore } from '../../stores/lineChartSettings';

import './ChartBox.view.scss';


const data = {
  labels: ['July', 'February', 'March', 'April', 'May', 'June', 'July','March', 'April', 'May'],
  datasets: [
    {
      label: 'My First dataset',
      fill: true,
      lineTension: 0.5,
      backgroundColor: '#EB1E64',
      borderColor: '#fff',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'red',
      pointBorderColor: '#EB1E64',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81,23 ,123, 34, 23, 67, 40]
    },
    {
      label: 'My First dataset',
      fill: true,
      lineTension: 0.5,
      backgroundColor: 'blue',
      borderColor: '#fff',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'red',
      pointBorderColor: '#EB1E64',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55,44,43, 40]
    }
  ],
  scaleFontColor: 'white',
};

@withRouter
@inject('lineChartSettingsStore')
@observer
export default class ChartBox extends Component {
  static propTypes = {
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
      data: data,
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
          display: false,
          position: 'top',
          fontSize: 12,
          fontFamily: "Arial",
          fontStyle: 'normal',
          fontColor: '#ffffff',
          lineHeight: 1.2,
          text: 'Example title'
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
    this.props.lineChartSettingsStore.canvasRef = this.lineChartRef;
    // set observable chart object
    this.props.lineChartSettingsStore.lineChartObject = this.lineChart;
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