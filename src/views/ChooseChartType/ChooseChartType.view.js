import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Bind } from 'lodash-decorators';

import { AuthStore } from '../../stores/auth';
import NavBar from '../NavBar/NavBar.view';

// routes
import { 
  HOME, 
  DASHBOARD, 
  LINE_CHART,
  BAR_CHART,
  RADAR_CHART,
  PIE_CHART,
  POLAR_AREA_CHART,
  BUBBLE_CHART,
  SCATTER_CHART
} from '../../common/consts/routes';

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
  onButtonClick(location) {
    this.props.history.push(location);
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
              <div role="button" className="chart-box" onClick={() => this.onButtonClick(HOME)}>
                <LineChart width={48} height={48} />
                <div className="chart-label">{intl.formatMessage(translations.lineChart)}</div>
              </div>
              <div role="button" className="chart-box" onClick={() => this.onButtonClick(BAR_CHART)}>
                <BarChart width={48} height={48} />
                <div className="chart-label">{intl.formatMessage(translations.barChart)}</div>        
              </div>
              <div role="button" className="chart-box" onClick={() => this.onButtonClick(RADAR_CHART)}>
                <RadarChart width={48} height={48} />
                <div className="chart-label">Radar chart</div>              
              </div>
              <div role="button" className="chart-box" onClick={() => this.onButtonClick(PIE_CHART)}>
                <PieChart width={48} height={48} />
                <div className="chart-label">Doughnut and pie chart</div> 
              </div>
              <div role="button" className="chart-box" onClick={() => this.onButtonClick(POLAR_AREA_CHART)}>
                <PolarAreaChart width={64} height={64} />
                <div className="chart-label">Polar area chart</div> 
              </div>
              <div role="button" className="chart-box" onClick={() => this.onButtonClick(BUBBLE_CHART)}>
                <BubbleChart width={48} height={48} />
                <div className="chart-label">Bubble chart</div>  
              </div>
              <div role="button" className="chart-box" onClick={() =>this.onButtonClick(SCATTER_CHART)}> 
                <ScatterChart width={48} height={48} />
                <div className="chart-label">Scatter chart</div>        
              </div>
            </div>
            <div className="content__title--saved">Your saved charts</div>
            <div role="button" className="chart-box-saved" onClick={() => this.onButtonClick(DASHBOARD)}>
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