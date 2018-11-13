import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import Collapsible from 'react-collapsible';
import ColorInput from '../../../common/components/ColorInput/ColorInput';
import OptionSectionHeader from '../../../views/Sidebar/components/OptionSectionHeader/OptionSectionHeader';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { observer, inject } from 'mobx-react';
import ContextMenu from '../../../common/components/ContextMenu/ContextMenu';
import InputNumber from '../../../common/components/InputNumber/InputNumber';
import Switch from '../../../common/components/Switch/Switch';
import Button from '../../../common/components/Button/Button';
import InfoIcon from '../../../common/icons/info.svg';
import { SliderPicker, ChromePicker } from 'react-color';

import Chart from 'chart.js';

import { LineChartSettingsStore } from '../../../stores/lineChartSettings';

import './LineChartSettings.view.scss';

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

@inject('lineChartSettingsStore')
@observer
export default class LineChartSettings extends Component {
  static propTypes = {
    lineChartSettingsStore: PropTypes.instanceOf(LineChartSettingsStore).isRequired
  }

  @action.bound
  onOptionChange(option, value) {
    const { lineChartSettingsStore } = this.props;
    lineChartSettingsStore[option] = value;
    console.log(value);
    console.log(this.props.lineChartSettingsStore);
  }

  @action.bound
  onPaddingChange(option,value) {
    const { lineChartSettingsStore } = this.props;
    lineChartSettingsStore.padding[option] = value;
    console.log(value);
    console.log(this.props.lineChartSettingsStore.padding);
  }

  @action.bound
  onRGBColorChange(color) {
    const { lineChartSettingsStore } = this.props;
    const rgbColor = color.rgb;
    const hexColor = color.hex;
    const formatedRgbToString = `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${rgbColor.a})`;
    lineChartSettingsStore.backgroundColor.rgba = formatedRgbToString;
    lineChartSettingsStore.backgroundColor.hex = hexColor;
    console.log(this.props.lineChartSettingsStore.backgroundColor);
    console.log(lineChartSettingsStore.lineChartObject);
    lineChartSettingsStore.lineChartObject.update();
  }

  render() {
    const { lineChartSettingsStore } = this.props;

    return (
      <div className="settings-wrapper">
        <div className="option-wrapper">
        <div className="label-wrapper">
          <div className="label-wrapper__label">Responsive</div>
          <Button
            className="label-info" 
            textColor="pink"    
            onClick={this.goToNewChart} 
          >
            <InfoIcon width={10} height={10}/>
          </Button>
        </div>
          <Switch
            style={{ width: 80 }}
            checked={lineChartSettingsStore.responsive}
            onChange={value => this.onOptionChange('responsive', value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Responsive animation duration</div>
          <InputNumber
            style={{ width: 80 }}
            precision={0}
            step={1}
            defaultValue={lineChartSettingsStore.responsiveAnimationDuration}
            value={lineChartSettingsStore.responsiveAnimationDuration}
            onChange={value => this.onOptionChange('responsiveAnimationDuration',value)}
          />
        </div>
        <div className="option-wrapper">
        <div className="label-wrapper">
          <div className="label-wrapper__label">Maintain aspect ratio</div>
          <Button
            className="label-info" 
            textColor="pink"    
            onClick={this.goToNewChart} 
          >
            <InfoIcon width={10} height={10}/>
          </Button>
        </div>
          <Switch
            style={{ width: 80 }}
            checked={lineChartSettingsStore.maintainAspectRatio}
            onChange={value => this.onOptionChange('maintainAspectRatio', value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Background color</div>
          <ContextMenu 
            className="option-settings"
            position="leftBottom" 
            body={
            <ChromePicker 
              color={lineChartSettingsStore.backgroundColor.rgba} 
              onChange={color => this.onRGBColorChange(color)}  
            />}
          >
            <ColorInput color={lineChartSettingsStore.backgroundColor.hex} />
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
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.padding.top}
              value={lineChartSettingsStore.padding.top}
              onChange={value => this.onPaddingChange('top',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding right</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.padding.right}
              value={lineChartSettingsStore.padding.right}
              onChange={value => this.onPaddingChange('right',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding bottom</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.padding.bottom}
              value={lineChartSettingsStore.padding.bottom}
              onChange={value => this.onPaddingChange('bottom',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Padding left</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.padding.left}
              value={lineChartSettingsStore.padding.left}
              onChange={value => this.onPaddingChange('left',value)}
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