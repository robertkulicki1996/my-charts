import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { Line } from 'react-chartjs-2';

import './ChartBox.view.scss';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','dssdds','dssdds', 'sddssd'],
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
      data: [65, 59, 80, 81, 56, 55, 40]
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
          fontColor: "#000000",
          fontSize: 18,
          stepSize: 1,
          beginAtZero: true
      }
  }],
  xAxes: [{
      ticks: {
          fontColor: "#000000",
          fontSize: 14,
          stepSize: 1,
          beginAtZero: true
      }
  }]
}

@observer
export default class ChartBox extends Component {

  render() {
    return (
      <div className="chart-box" >
        <Line data={data} options={options} legend={scales} />
      </div>
    );
  }
}