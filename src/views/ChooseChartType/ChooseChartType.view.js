import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { AuthStore } from '../../stores/auth';
import NavBar from '../NavBar/NavBar.view';

import FloppyDisc from '../../common/icons/floppy-disk.svg';
import LineChart from '../../common/icons/line-chart.svg';

import './ChooseChartType.view.scss';
import translations from './ChooseChartType.view.intl';

@injectIntl
@inject('authStore')
@observer
class ChooseChartType extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    const { intl } = this.props;

    return (
      <div className="choose-chart-type-wrapper">
        <NavBar />
        <div className="choose-chart-type">
          <div className="title-block">
            <div className="title-block__title">{intl.formatMessage(translations.title)}</div>
            <div className="title-block__subtitle">{intl.formatMessage(translations.subtitle)}</div>
            <div className="chart-types">
              <div className="chart-box-saved">
                <FloppyDisc width={36} height={36} />
                <div className="chart-label">{intl.formatMessage(translations.mySavedCharts)}</div>
              </div>
              <div className="chart-box">
                <LineChart width={48} height={48} />
                <div className="chart-label">Line</div>
                <div className="chart-sublabel">A line chart is a way of plotting data points on a line. Often, it is used to show trend data, or the comparison of two data sets.</div>
              </div>
              <div className="chart-box">
                <LineChart width={48} height={48} />
                <div className="chart-label">Bar</div>
                <div className="chart-sublabel">A bar chart provides a way of showing data values represented as vertical bars. It is sometimes used to show trend data, and the comparison of multiple data sets side by side.</div>
              </div>
              <div className="chart-box">
                <LineChart width={48} height={48} />
                <div className="chart-label">Radar</div>
                <div className="chart-sublabel">A radar chart is a way of showing multiple data points and the variation between them. They are often useful for comparing the points of two or more different data sets.</div>
              </div>
              <div className="chart-box">
                <LineChart width={48} height={48} />
                <div className="chart-label">Doughnut and pie</div>
                <div className="chart-sublabel">Pie and doughnut charts are probably the most commonly used charts. They are divided into segments, the arc of each segment shows the proportional value of each piece of data. They are excellent at showing the relational proportions between data.</div>
              </div>
              <div className="chart-box">
                <LineChart width={48} height={48} />
                <div className="chart-label">Polar area</div>
                <div className="chart-sublabel">Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value. This type of chart is often useful when we want to show a comparison data similar to a pie chart, but also show a scale of values for context.</div>
              </div>
              <div className="chart-box">
                <LineChart width={48} height={48} />
                <div className="chart-label">Bubble</div>
                <div className="chart-sublabel">A bubble chart is used to display three dimensions of data at the same time. The location of the bubble is determined by the first two dimensions and the corresponding horizontal and vertical axes. The third dimension is represented by the size of the individual bubbles.</div>
              </div>
              <div className="chart-box">
                <LineChart width={48} height={48} />
                <div className="chart-label">Scatter</div>
                <div className="chart-sublabel">Scatter charts are based on basic line charts with the x axis changed to a linear axis. To use a scatter chart, data must be passed as objects containing X and Y properties.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChooseChartType;