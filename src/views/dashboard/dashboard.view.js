import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { PropagateLoader } from 'react-spinners';

import { AuthStore } from '../../stores/auth';
import NavBar from '../NavBar/NavBar.view';

// components
import AvatarWithName from '../../common/components/AvatarWithName/AvatarWithName';

// icons
// import FloppyDisc from '../../common/icons/floppy-disk.svg';
import LineChart from '../../common/icons/line-chart.svg';
import BarChart from '../../common/icons/stats.svg';
// import RadarChart from '../../common/icons/radar-chart.svg';
import PieChart from '../../common/icons/pie-chart-1.svg';
// import PolarAreaChart from '../../common/icons/area-chart.svg';
// import BubbleChart from '../../common/icons/bubble-chart.svg';
// import ScatterChart from '../../common/icons/scatter-chart.svg';

import './Dashboard.view.scss';
import translations from './Dashboard.view.intl';

@withRouter
@injectIntl
@inject('authStore')
@observer
class Dashboard extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  @observable isLoading = true;
  @observable displayName = '';
  @observable email = '';
  @observable photoURL = ''; 

  @action
  async componentDidMount() {
    const { authStore } = this.props;

    await authStore.setUserAuthState();
    const userInfo = authStore.authUser;
    if(userInfo) {
      this.displayName = userInfo.displayName === null ? userInfo.email : userInfo.displayName;
      this.email = userInfo.displayName === null ? '' : userInfo.email;
      this.photoURL = userInfo.photoURL === null ? '' : userInfo.photoURL;
      this.isLoading = false;
    } 
  }

  render() {
    const { intl } = this.props;

    return this.isLoading ? (
      <PropagateLoader
        size={14}
        color={'#ffffff'}
        loading={true}
      />
    ) : (
      <div className="dashboard-wrapper">
        <NavBar />
        <div className="user-charts">
          <div className="user-charts__title">{intl.formatMessage(translations.title)}</div>
          <AvatarWithName avatarUrl={this.photoURL} name={this.displayName} email={this.email} />
          <div className="user-charts__subtitle">{intl.formatMessage(translations.subtitle)}</div>
          <div className="user-charts__list">
            <div className="saved-chart-box">
              <LineChart width={48} height={48} />
              <div className="saved-chart-info">Last saved</div>
              <div className="date-time">18 November 2018</div>
              <div className="date-time">18:35:23 PM</div>
            </div>
            <div className="saved-chart-box">
              <BarChart width={48} height={48} />
              <div className="saved-chart-info">Last saved</div>
              <div className="date-time">17 November 2018</div>
              <div className="date-time">13:45:33 PM</div>
            </div>
            <div className="saved-chart-box">
              <PieChart width={48} height={48} />
              <div className="saved-chart-info">Last saved</div>
              <div className="date-time">13 November 2018</div>
              <div className="date-time">16:55:13 PM</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;