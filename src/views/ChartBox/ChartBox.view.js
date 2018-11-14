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
  labels: ['July','dssdds', 'February', 'March', 'April', 'May', 'June', 'July','dssdds','March', 'April', 'May', 'June', 'July'],
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

const scales = {
  yAxes: [{
      ticks: {
        fontColor: "white",
        fontSize: 12,
        stepSize: 50,
        beginAtZero: true
      }
  }],
  xAxes: [{
      ticks: {
        fontColor: "white",
        fontSize: 12,
        stepSize: 50,
        beginAtZero: true
      }
  }]
}

const options = {
  scaleFontColor: 'white',
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 8000,
    easing: 'easeInElastic'
  },
  layout: {
    padding: {
      left: 24,
      right: 24,
      top: 24,
      bottom: 24
    },
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
}

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
      options: options,
    });
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