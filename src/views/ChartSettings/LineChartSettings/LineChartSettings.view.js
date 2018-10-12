import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Collapsible from 'react-collapsible';
import Collapsible from 'react-collapsible';
import ColorPickerSectionHeader from '../../../views/Sidebar/components/ColorPickerSectionHeader/ColorPickerSectionHeader';
import OptionSectionHeader from '../../../views/Sidebar/components/OptionSectionHeader/OptionSectionHeader';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { observer } from 'mobx-react';
// import Switch from '../../common/components/Switch/Switch';
import InputNumber from '../../../common/components/InputNumber/InputNumber';
import { SliderPicker, CompactPicker, SketchPicker} from 'react-color';

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
            options={options} 
            placeholder="Select type" 
            controlClassName='custom-dropdown'
            placeholderClassName='custom-placeholder'
            arrowClassName='custom-arrow'
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Width</div>
          <InputNumber
            style={{ width: 100 }}
            defaultValue={800}
            onChange={onChange}
            precision={0}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Height</div>
          <InputNumber
            style={{ width: 100 }}
            defaultValue={380}
            onChange={onChange}
            precision={0}
          />
        </div>
        <Collapsible
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          trigger={
            <ColorPickerSectionHeader 
              title="Background color" 
              color="red" 
            />
          }
        >
          <CompactPicker />
        </Collapsible>
        <Collapsible 
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          height={300}
          trigger={
            <OptionSectionHeader title="Padding" />
          }
        >
          <div className="option-wrapper">
            <div className="label">Padding top</div>
            <InputNumber
              style={{ width: 100 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding right</div>
            <InputNumber
              style={{ width: 100 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding bottom</div>
            <InputNumber
              style={{ width: 100 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding left</div>
            <InputNumber
              style={{ width: 100 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
        </Collapsible>
        <Collapsible 
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          trigger={
            <OptionSectionHeader title="Margin" />
          }
        >
          <div className="option-wrapper-column">
            <div className="label margin-bottom">Color</div>
            <SliderPicker />
          </div>
          <div className="option-wrapper">
            <div className="label">Margin top</div>
            <InputNumber
              style={{ width: 100 }}
              defaultValue={0}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Margin right</div>
            <InputNumber
              style={{ width: 100 }}
              defaultValue={0}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Margin bottom</div>
            <InputNumber
              style={{ width: 100 }}
              defaultValue={0}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Margin left</div>
            <InputNumber
              style={{ width: 100 }}
              defaultValue={0}
              onChange={onChange}
              precision={0}
            />
          </div>
        </Collapsible>
        
      </div>
    );
  }
}