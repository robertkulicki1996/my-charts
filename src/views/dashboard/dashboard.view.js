/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { observable, action, runInAction } from 'mobx';
import { observer, inject } from 'mobx-react';
import { ClipLoader } from 'react-spinners';
import { map } from 'lodash';
import { Bind } from 'lodash-decorators';

import { AuthStore } from '../../stores/auth';
import { DataStore } from '../../stores/data';
import { lineChartSettingsStore } from '../../stores/ChartSettings/LineChartSettings';

import NavBar from '../NavBar/NavBar.view';

// components
import AvatarWithName from '../../common/components/AvatarWithName/AvatarWithName';
import Button from '../../common/components/Button/Button';

// consts
import { LINE, BAR, BUBBLE, PIE, DOUGHNUT } from '../../common/consts/chart-types';

// icons
import EditIcon from 'svg-react-loader?name=EditIcon!../../common/icons/edit-chart.svg';
import DeleteIcon from 'svg-react-loader?name=DeleteIcon!../../common/icons/delete.svg';
import LineChart from 'svg-react-loader?name=LineChart!../../common/icons/line-chart.svg';
import BarChart from 'svg-react-loader?name=BarChart!../../common/icons/stats.svg';
import PieChart from 'svg-react-loader?name=PieChart!../../common/icons/pie-chart-1.svg';
import BubbleChart from 'svg-react-loader?name=BubbleChart!../../common/icons/bubble-chart.svg';

import './Dashboard.view.scss';
import translations from './Dashboard.view.intl';

@withRouter
@injectIntl
@inject('authStore', 'dataStore', 'lineChartSettingsStore')
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

  @Bind()
  renderChartIcon(type) {
    switch(type) {
      case LINE: 
        return <LineChart width={48} height={48} />;
      case BAR: 
        return <BarChart width={48} height={48} />;
      case PIE:
        return <PieChart width={48} height={48} />;
      case DOUGHNUT:
        return <PieChart width={48} height={48} />;
      case BUBBLE: 
        return <BubbleChart width={48} height={48} />
      default:
        return '';
    }
  }

  @action.bound
  async deleteChart(chartId) {
    const { dataStore} = this.props;
    runInAction(() => {
      this.isLoading = true;
    })
    try {
      await dataStore.deleteChart(chartId);
      this.charts = await dataStore.getUserCharts();
      runInAction(() => {
        this.isLoading = false;
      }) 
    } catch(e) {
      window.console.error(e);
    }
  }

  @action.bound
  goToEditChart(chart) {
    const { dataStore, lineChartSettingsStore, history } = this.props;
    const { chart_data } = chart;

    dataStore.categories = chart_data.categories;
    dataStore.datasets = chart_data.datasets;
    dataStore.rows = chart_data.rows;
    dataStore.chartDatasetsProperties = chart_data.datasetsProperties;
    dataStore.chartDescription = chart_data.description;

    lineChartSettingsStore.type = chart_data.options.type;
    lineChartSettingsStore.responsive = chart_data.options.responsive;
    lineChartSettingsStore.responsiveAnimationDuration = chart_data.options.responsiveAnimationDuration;
    lineChartSettingsStore.backgroundColor = chart_data.options.backgroundColor;
    lineChartSettingsStore.padding = chart_data.options.padding;
    lineChartSettingsStore.animation = chart_data.options.animation;
    lineChartSettingsStore.legend = chart_data.options.legend;
    lineChartSettingsStore.title = chart_data.options.title;
    lineChartSettingsStore.tooltips = chart_data.options.tooltips;
    lineChartSettingsStore.xAxes = chart_data.options.xAxes;
    lineChartSettingsStore.yAxes = chart_data.options.yAxes;

    history.push(`/home/${chart.id}`);
  }

  // id: chartId,
  // saved_at: savedDate,
  // type: lineChartSettingsStore.type,
  // user_id: userId,
  // chart_data: {
  //   description: this.chartDescription,
  //   categories: this.categories.slice(),
  //   rows: this.rows.slice(),
  //   datasets: this.datasets.slice(),
  //   datasetsProperties: this.chartDatasetsProperties.slice(),
  //   options: lineChartSettingsStore
  // }

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
                  <div 
                    key={chart.id} 
                    className="saved-chart-box"
                  >
                    {this.renderChartIcon(chart.type)}
                    <div className="saved-chart-info">{chart.chart_data.options.title.text}</div>
                    <div className="date-time">Saved at :</div>
                    <div className="date-time">{new Date(chart.saved_at).toLocaleString()}</div>
                    <Button className="remove-chart" onClick={() => this.deleteChart(chart.id)}>
                      <DeleteIcon 
                        width={14} 
                        height={14} 
                      />
                    </Button>
                    <Button className="edit-chart" onClick={() => this.goToEditChart(chart)}>
                      <EditIcon 
                        width={16} 
                        height={16} 
                      />
                    </Button>
                  </div>
                ))) : (
                  <div>There is no saved charts.</div>
                )} 
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;