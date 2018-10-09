import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Chart } from 'chart.js';

import './ChartBox.view.scss';

const data = {
  labels: ['July','dssdds', 'February', 'March', 'April', 'May', 'June', 'July','dssdds','March', 'April', 'May', 'June', 'July','dssdds','dssdds', 'sddssd','dfdfdf','dferefdf','dfde3r3er','dfdfcvcverr4'],
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
      data: [65, 59, 80, 81,23 ,123, 34, 23, 67, 89, 67, 90, 56, 55, 40]
    },
    {
      label: 'My First dataset',
      fill: true,
      lineTension: 0.5,
      backgroundColor: 'orange',
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
      data: [65, 59, 80, 81, 56, 55,44,43,213,345,345, 40]
    }
  ]
};

const options = { 
  legend: {
      labels: {
          fontColor: "#000000",
          fontSize: 14
      }
  }
}

const scales = {
  yAxes: [{
      ticks: {
          fontColor: "white",
          fontSize: 12,
          stepSize: 10,
          beginAtZero: true
      }
  }],
  xAxes: [{
      ticks: {
          fontColor: "white",
          fontSize: 12,
          stepSize: 10,
          beginAtZero: true
      }
  }]
}

window.onload = function() {
  var ctx = document.getElementById('canvas').getContext('2d');
  window.myBar = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      legend: {
        position: 'top',
        labels: {
          fontColor: 'white',
          fontSize: 18
        }
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
        fontColor: 'white'
      },
      scales: scales
    }
  });
};

@observer
export default class ChartBox extends Component {

  render() {
    return (
      <div className="chart-box" >
        <canvas id="canvas" height="140"></canvas>
      </div>
    );
  }
}