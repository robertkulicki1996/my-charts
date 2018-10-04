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
        <Sidebar />
        <div class="main-content">
          <ChartBox />
          <ChartDataBox />
        </div>
      </div>
    );
  }
}

export default Home;