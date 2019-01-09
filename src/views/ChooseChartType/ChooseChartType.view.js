import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

// stores
import { AuthStore } from '../../stores/auth';
import { DataStore } from '../../stores/data';
import { LineChartSettingsStore } from '../../stores/ChartSettings/LineChartSettings';

// routes
import { 
  HOME, 
  DASHBOARD
} from '../../common/consts/routes';

import NavBar from '../NavBar/NavBar.view';

// icons
import FloppyDisc from '../../common/icons/floppy-disk.svg';
import LineChart from '../../common/icons/line-chart.svg';
import BarChart from '../../common/icons/stats.svg';
import RadarChart from '../../common/icons/radar-chart.svg';
import PieChart from '../../common/icons/pie-chart-1.svg';
import PolarAreaChart from '../../common/icons/area-chart.svg';
import BubbleChart from '../../common/icons/bubble-chart.svg';
import ScatterChart from '../../common/icons/scatter-chart.svg';

import translations from './ChooseChartType.view.intl';
import './ChooseChartType.view.scss';

@injectIntl
@inject('authStore', 'dataStore', 'lineChartSettingsStore')
@observer
class ChooseChartType extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired,
    dataStore: PropTypes.instanceOf(DataStore).isRequired,
    lineChartSettingsStore: PropTypes.instanceOf(LineChartSettingsStore).isRequired
  }

  @action.bound
  handleButtonClick(location, chartType) {
    const { history, lineChartSettingsStore } = this.props;
    switch(chartType) {
      case 'line': 
        lineChartSettingsStore.type = 'line';
        break;
      case 'bar':
        lineChartSettingsStore.type = 'bar';
        break;
      default:
        lineChartSettingsStore.type = 'line';
    }
    history.push(location);
  }

  render() {
    const { intl } = this.props;

    return (
      <div className="choose-chart-type-wrapper">
        <NavBar isNewChartButton={false} />
        <div className="choose-chart-type">
          <div className="content">
            <div className="content__huge-title">{intl.formatMessage(translations.title)}</div>
            <div className="content__title">{intl.formatMessage(translations.firstSectionTitle)}</div>
            <div className="content__subtitle">{intl.formatMessage(translations.firstSectionSubtitle)}</div>
            <div className="chart-types">
              <div role="button" className="chart-box" onClick={() => this.handleButtonClick(HOME,'line')}>
                <LineChart width={48} height={48} />
                <div className="chart-label">{intl.formatMessage(translations.lineChart)}</div>
              </div>
              <div role="button" className="chart-box" onClick={() => this.handleButtonClick(HOME, 'bar')}>
                <BarChart width={48} height={48} />
                <div className="chart-label">{intl.formatMessage(translations.barChart)}</div>        
              </div>
              <div role="button" className="chart-box" onClick={() => this.handleButtonClick(HOME)}>
                <RadarChart width={48} height={48} />
                <div className="chart-label">Radar chart</div>              
              </div>
              <div role="button" className="chart-box" onClick={() => this.handleButtonClick(HOME)}>
                <PieChart width={48} height={48} />
                <div className="chart-label">Doughnut and pie chart</div> 
              </div>
              <div role="button" className="chart-box" onClick={() => this.handleButtonClick(HOME)}>
                <PolarAreaChart width={64} height={64} />
                <div className="chart-label">Polar area chart</div> 
              </div>
              <div role="button" className="chart-box" onClick={() => this.handleButtonClick(HOME)}>
                <BubbleChart width={48} height={48} />
                <div className="chart-label">Bubble chart</div>  
              </div>
              <div role="button" className="chart-box" onClick={() =>this.handleButtonClick(HOME)}> 
                <ScatterChart width={48} height={48} />
                <div className="chart-label">Scatter chart</div>        
              </div>
            </div>
            <div className="content__title--saved">Your saved charts</div>
            <div role="button" className="chart-box-saved" onClick={() => this.handleButtonClick(DASHBOARD)}>
              <FloppyDisc width={48} height={48} />
              <div className="chart-label">My charts</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChooseChartType;