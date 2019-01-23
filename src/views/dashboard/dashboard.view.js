import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { ClipLoader } from 'react-spinners';
import { map } from 'lodash';
import { moment } from 'moment';

import { AuthStore } from '../../stores/auth';
import { DataStore } from '../../stores/data';

import NavBar from '../NavBar/NavBar.view';

// components
import AvatarWithName from '../../common/components/AvatarWithName/AvatarWithName';

// icons
import LineChart from '../../common/icons/line-chart.svg';
import BarChart from '../../common/icons/stats.svg';
import PieChart from '../../common/icons/pie-chart-1.svg';
import BubbleChart from '../../common/icons/bubble-chart.svg';

import './Dashboard.view.scss';
import translations from './Dashboard.view.intl';

@withRouter
@injectIntl
@inject('authStore', 'dataStore')
@observer
class Dashboard extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired,
    dataStore: PropTypes.instanceOf(DataStore).isRequired
  }

  @observable isLoading = true;
  @observable displayName = '';
  @observable email = '';
  @observable photoURL = ''; 

  @observable charts = [];

  @action
  componentDidMount() {
    const { authStore, dataStore} = this.props;
    this.isLoading = true;
    setTimeout(async () => {
      try {
        const userInfo = authStore.getCurrentUserInfo();
        if(userInfo) {
          this.displayName = userInfo.displayName === null ? userInfo.email : userInfo.displayName;
          this.email = userInfo.displayName === null ? '' : userInfo.email;
          this.photoURL = userInfo.photoURL === null ? '' : userInfo.photoURL;
        }
        this.charts = await dataStore.getUserCharts();
      } catch(e) {
        window.console.error(e);
      }
      this.isLoading = false;
    },1500);
  }

  render() {
    const { intl } = this.props;
    const { isLoading, charts } = this;

    return(
      <div className="dashboard-wrapper">
        <NavBar />
        <div className="user-charts">
          <div className="user-charts__title">{intl.formatMessage(translations.title)}</div>
          {isLoading ? (
            <div className='loader-wrapper'>
              <ClipLoader
                size={60}
                color={'#eb1e64'}
                loading={isLoading}
              />
            </div>
          ) : (
            <React.Fragment>
              <AvatarWithName avatarUrl={this.photoURL} name={this.displayName} email={this.email} />
              <div className="user-charts__subtitle">{intl.formatMessage(translations.subtitle)}</div>
              <div className="user-charts__list">
                {charts !== null ? (map(Object.values(charts), chart => (
                  <div key={chart.id} className="saved-chart-box">
                    {console.log('chart -> ',chart)}
                    <LineChart width={48} height={48} />
                    <div className="saved-chart-info">{chart.chart_data.options.title.text}</div>
                    <div className="date-time">Created at :</div>
                    <div className="date-time">{new Date(chart.created_at).toLocaleString()}</div>
                  </div>
                ))) : (
                  <div>There is no saved charts.</div>
                )} 
                {/* <div className="saved-chart-box">
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
                </div> */}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;