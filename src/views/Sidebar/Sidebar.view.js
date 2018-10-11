import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';
import 'react-dropdown/style.css';
import { observer } from 'mobx-react';
import Switch from '../../common/components/Switch/Switch';
import InputNumber from '../../common/components/InputNumber/InputNumber';
import SectionHeader from './components/SectionHeader/SectionHeader';
import LineChartSettings from '../ChartSettings/LineChartSettings/LineChartSettings.view';
import { SliderPicker, TwitterPicker, CirclePicker } from 'react-color';

import './Sidebar.view.scss';

function onChange(value) {
  console.log(`switch checked: ${value}`);
}


@observer
export default class Sidebar extends Component {

  state = {
    disabled: false,
    r: 'a'
  }

  render() {
    return (
      <div className="options-sidebar">
        <Collapsible 
          open={true} 
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          trigger={
            <SectionHeader title="Chart"/>
          }
        >
          <LineChartSettings />
        </Collapsible>
        <Collapsible 
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          trigger={
            <SectionHeader title="Section 2" />
          } 
        >
          <div style={{ margin: 20 }}>
            <Switch
              onChange={onChange}
              disabled={this.state.disabled}
            />
          </div>
          <div style={{ margin: 20 }}>
            <TwitterPicker />
          </div>
          <div style={{ margin: 20 }}>
            <InputNumber
              style={{ width: 100 }}
              defaultValue={10}
              onChange={onChange}
              precision={2}
            />
          </div>
          <div style={{ margin: 20 }}>
            <CirclePicker />
          </div>
          <div style={{ margin: 20 }}>
            <Switch
              onChange={onChange}
              disabled={this.state.disabled}
            />
          </div>
          <div style={{ margin: 20 }}>
            <SliderPicker />
          </div>
          <div style={{ margin: 20 }}>
            <Switch
              onChange={onChange}
              disabled={this.state.disabled}
            />
          </div>
        </Collapsible>
        <Collapsible 
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          trigger={
            <SectionHeader title="Section 3" padding={true}/>
          } 
        >
          <div style={{ margin: 20 }}>
            <Switch
              onChange={onChange}
              disabled={this.state.disabled}
            />
          </div>
          <div style={{ margin: 20 }}>
            <TwitterPicker />
          </div>
          <div style={{ margin: 20 }}>
            <InputNumber
              style={{ width: 120 }}
              defaultValue={10}
              onChange={onChange}
              precision={2}
            />
          </div>
          <div style={{ margin: 20 }}>
            <CirclePicker />
          </div>
          <div style={{ margin: 20 }}>
            <Switch
              onChange={onChange}
              disabled={this.state.disabled}
            />
          </div>
          <div style={{ margin: 20 }}>
            <SliderPicker />
          </div>
          <div style={{ margin: 20 }}>
            <Switch
              onChange={onChange}
              disabled={this.state.disabled}
            />
          </div>
        </Collapsible>
      </div>
    );
  }
}