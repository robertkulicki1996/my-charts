import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { AuthStore } from '../../stores/auth.store';

import Sidebar from '../Sidebar/Sidebar.view';
import NavBar from '../NavBar/NavBar.view';
import ChartBox from '../ChartBox/ChartBox.view';
import ChartDataBox from '../ChartDataBox/ChartDataBox.view';

import './Home.view.scss';

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
        <div className="home-wrapper__main-content">
          <Sidebar />
          <div className="home-wrapper__main-content__chart-wrapper">
            <ChartBox />
            <ChartDataBox />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;