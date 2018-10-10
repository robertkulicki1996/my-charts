import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Collapsible from 'react-collapsible';
import Collapsible from 'react-collapsible';
import SectionHeader from '../../../views/Sidebar/components/SectionHeader/SectionHeader';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { observer } from 'mobx-react';
// import Switch from '../../common/components/Switch/Switch';
import InputNumber from '../../../common/components/InputNumber/InputNumber';
// import SectionHeader from './components/SectionHeader/SectionHeader';
import { SliderPicker } from 'react-color';

import './LineChartSettings.view.scss';

function onChange(value) {
  console.log(`switch checked: ${value}`);
}

const options = [
  'one', 'two', 'three'
]

@observer
export default class LineChartSettings extends Component {

  render() {
    return (
      <div className="settings-wrapper">
        <div className="option-wrapper">
          <div className="label">Chart type</div>
          <Dropdown 
            controlClassName='custom-dropdown'
            options={options} 
            placeholder="Select type" 
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Width</div>
          <InputNumber
            style={{ width: 120 }}
            defaultValue={800}
            onChange={onChange}
            precision={0}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Height</div>
          <InputNumber
            style={{ width: 120 }}
            defaultValue={380}
            onChange={onChange}
            precision={0}
          />
        </div>
        <div className="option-wrapper-column">
          <div className="label margin-bottom">Background color</div>
          <SliderPicker />
        </div>
        <Collapsible 
          trigger={<SectionHeader title="Padding" />}
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
        >
          <div className="option-wrapper">
            <div className="label">Padding top</div>
            <InputNumber
              style={{ width: 120 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding right</div>
            <InputNumber
              style={{ width: 120 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding bottom</div>
            <InputNumber
              style={{ width: 120 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding left</div>
            <InputNumber
              style={{ width: 120 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
        </Collapsible>
        
      </div>
    );
  }
}