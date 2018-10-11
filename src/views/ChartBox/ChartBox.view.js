import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Line } from 'react-chartjs-2';

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

@observer
export default class ChartBox extends Component {

  render() {
    return (
      <Line 
        data={data}  
        scales={scales}
        options={{
          scaleFontColor: 'white',
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 24,
              right: 24,
              top: 24,
              bottom: 24
            }
          },
          legend: {
            labels: {
              fontColor: "white",
              fontSize: 14
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
        }} 
      />
    );
  }
}