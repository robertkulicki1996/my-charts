import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Bind } from 'lodash-decorators';

import { AuthStore } from '../../stores/auth';
import NavBar from '../NavBar/NavBar.view';

// routes
import { HOME, DASHBOARD, LINE_CHART } from '../../common/consts/routes';

// icons
import FloppyDisc from '../../common/icons/floppy-disk.svg';
import LineChart from '../../common/icons/line-chart.svg';
import BarChart from '../../common/icons/stats.svg';
import RadarChart from '../../common/icons/radar-chart.svg';
import PieChart from '../../common/icons/pie-chart-1.svg';
import PolarAreaChart from '../../common/icons/area-chart.svg';
import BubbleChart from '../../common/icons/bubble-chart.svg';
import ScatterChart from '../../common/icons/scatter-chart.svg';

import './ChooseChartType.view.scss';
import translations from './ChooseChartType.view.intl';

@injectIntl
@inject('authStore')
@observer
class ChooseChartType extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  @Bind()
  onLineChartClick() {
    const { history } = this.props;
    const { location } = history;
    console.log(location);
    history.push(HOME);
  }

  render() {
    const { intl } = this.props;

    return (
      <div className="choose-chart-type-wrapper">
        <NavBar />
        <div className="choose-chart-type">
          <div className="title-block">
            <div className="title-block__huge-title">{intl.formatMessage(translations.title)}</div>
            <div className="title-block__title">{intl.formatMessage(translations.firstSectionTitle)}</div>
            <div className="title-block__subtitle">{intl.formatMessage(translations.firstSectionSubtitle)}</div>
            <div className="chart-types">
              <div role="button" className="chart-box" onClick={this.onLineChartClick}>
                <LineChart width={48} height={48} />
                <div className="chart-label">{intl.formatMessage(translations.lineChart)}</div>
              </div>
              <div role="button" className="chart-box">
                <BarChart width={48} height={48} />
                <div className="chart-label">{intl.formatMessage(translations.barChart)}</div>        
              </div>
              <div role="button" className="chart-box">
                <RadarChart width={48} height={48} />
                <div className="chart-label">Radar chart</div>              
              </div>
              <div role="button" className="chart-box">
                <PieChart width={48} height={48} />
                <div className="chart-label">Doughnut and pie chart</div> 
              </div>
              <div role="button" className="chart-box">
                <PolarAreaChart width={64} height={64} />
                <div className="chart-label">Polar area chart</div> 
              </div>
              <div role="button" className="chart-box">
                <BubbleChart width={48} height={48} />
                <div className="chart-label">Bubble chart</div>  
              </div>
              <div role="button" className="chart-box">
                <ScatterChart width={48} height={48} />
                <div className="chart-label">Scatter chart</div>        
              </div>
            </div>
            <div className="title-block__title--saved">Your saved charts</div>
            <div role="button" className="chart-box-saved">
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