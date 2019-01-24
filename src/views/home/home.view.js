import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

import SplitterLayout from 'react-splitter-layout';

import { AuthStore } from '../../stores/auth';

import Sidebar from '../Sidebar/Sidebar.view';
import NavBar from '../NavBar/NavBar.view';
import ChartBox from '../ChartBox/ChartBox.view';
import ChartDataBox from '../ChartDataBox/ChartDataBox.view';

import './Home.view.scss';

@injectIntl
@withRouter
@inject('authStore')
@observer
class Home extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  @observable currentChartDataBoxHeight;

  @action.bound
  handleHeightChange(height) {
    this.currentChartDataBoxHeight = height;
  }

  render() {
    return (
      <div className="home-wrapper">
        <NavBar />
        <Sidebar />
        <SplitterLayout 
          primaryIndex={0} 
          vertical={true} 
          customClassName="splitter-layout"
          onSecondaryPaneSizeChange={this.handleHeightChange}
        >
          <ChartBox />
          <ChartDataBox height={this.currentChartDataBoxHeight}/>
        </SplitterLayout>
      </div>
    );
  }
}

export default Home;