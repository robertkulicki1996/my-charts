import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { AuthStore } from '../../stores/auth.store';
import { Line } from 'react-chartjs-2';

import Sidebar from '../Sidebar/Sidebar.view';
import NavBar from '../NavBar/NavBar.view';

import './Home.view.scss';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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

@injectIntl
@inject('authStore')
@observer
class Home extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    return (
      <div className="home-wrapper">
        <NavBar />
        <Sidebar />
        <Line  data={data} width={500} options={options} legend={scales}/>
      </div>
    );
  }
}

export default Home;