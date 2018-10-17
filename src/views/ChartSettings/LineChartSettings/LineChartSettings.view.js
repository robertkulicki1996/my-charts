import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import Collapsible from 'react-collapsible';
import Collapsible from 'react-collapsible';
import ColorInput from '../../../common/components/ColorInput/ColorInput';
import OptionSectionHeader from '../../../views/Sidebar/components/OptionSectionHeader/OptionSectionHeader';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { observer } from 'mobx-react';
import ContextMenu from '../../../common/components/ContextMenu/ContextMenu';
import InputNumber from '../../../common/components/InputNumber/InputNumber';
import Switch from '../../../common/components/Switch/Switch';
import { SliderPicker, ChromePicker } from 'react-color';

import './LineChartSettings.view.scss';

function onChange(value) {
  console.log(`switch checked: ${value}`);
}

const options = [
  'linear',
  'easeInQuad',
  'easeOutQuad',
  'easeInOutQuad',
  'easeInCubic',
  'easeOutCubic',
  'easeInOutCubic',
  'easeInQuart',
  'easeOutQuart',
  'easeInOutQuart',
  'easeInQuint',
  'easeOutQuint',
  'easeInOutQuint',
  'easeInSine',
  'easeOutSine',
  'easeInOutSine',
  'easeInExpo',
  'easeOutExpo',
  'easeInOutExpo',
  'easeInCirc',
  'easeOutCirc',
  'easeInOutCirc',
  'easeInElastic',
  'easeOutElastic',
  'easeInOutElastic',
  'easeInBack',
  'easeOutBack',
  'easeInOutBack',
  'easeInBounce',
  'easeOutBounce',
  'easeInOutBounce',
]


@observer
export default class LineChartSettings extends Component {

  render() {
    return (
      <div className="settings-wrapper">
        <div className="option-wrapper">
          <div className="label">Responsive</div>
          <Switch
            style={{ width: 80 }}
            defaultValue={800}
            onChange={onChange}
            precision={0}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Width</div>
          <InputNumber
            style={{ width: 80 }}
            defaultValue={800}
            onChange={onChange}
            precision={0}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Height</div>
          <InputNumber
            style={{ width: 80 }}
            defaultValue={380}
            onChange={onChange}
            precision={0}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Responsive animation duration</div>
          <InputNumber
            style={{ width: 80 }}
            defaultValue={0}
            onChange={onChange}
            precision={0}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Maintain aspect ratio</div>
          <Switch
            style={{ width: 80 }}
            defaultValue={800}
            onChange={onChange}
            precision={0}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Background color</div>
          <ContextMenu 
            className="option-settings"
            position="leftBottom" 
            body={<ChromePicker />}
          >
            <ColorInput color="#6495ed" />
          </ContextMenu>
        </div>
        <Collapsible 
          open={true} 
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          height={300}
          trigger={
            <OptionSectionHeader title="Layout" />
          }
        >
          <div className="option-wrapper">
            <div className="label">Padding top</div>
            <InputNumber
              style={{ width: 80 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding right</div>
            <InputNumber
              style={{ width: 80 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding bottom</div>
            <InputNumber
              style={{ width: 80 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding left</div>
            <InputNumber
              style={{ width: 80 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
        </Collapsible>
        <Collapsible 
          open={true} 
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          height={300}
          trigger={
            <OptionSectionHeader title="Animations" />
          }
        >
          <div className="option-wrapper">
            <div className="label">Duration</div>
            <InputNumber
              style={{ width: 80 }}
              defaultValue={380}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Easing</div>
            <Dropdown 
              options={options} 
              placeholder="Select" 
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
        </Collapsible>
        <Collapsible 
          open={true} 
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          height={300}
          trigger={
            <OptionSectionHeader title="Legend" />
          }
        >
          <div className="option-wrapper">
            <div className="label">Display</div>
            <Switch
              style={{ width: 80 }}
              defaultValue={800}
              onChange={onChange}
              precision={0}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Position</div>
            <Dropdown 
              options={options} 
              placeholder="Select" 
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
        </Collapsible>
        {/* <Collapsible 
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
        </Collapsible> */}
        
      </div>
    );
  }
}