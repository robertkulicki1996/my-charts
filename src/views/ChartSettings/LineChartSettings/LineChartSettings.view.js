import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
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
import Input from '../../../common/components/Input/Input';

import InfoIcon from '../../../common/icons/info.svg';
import { ChromePicker } from 'react-color';

import { LineChartSettingsStore } from '../../../stores/lineChartSettings';

import './LineChartSettings.view.scss';

const animationOptions = [
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
];

const labelsPositionOptions = ['top','right','bottom','left'];

@inject('lineChartSettingsStore')
@observer
export default class LineChartSettings extends Component {
  static propTypes = {
    lineChartSettingsStore: PropTypes.instanceOf(LineChartSettingsStore).isRequired
  }

  @action.bound
  onTitleChange(event) {
    this.props.lineChartSettingsStore.title.text = event.target.value;
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

  @action.bound
  onAnimationChange(option, value) {
    const { lineChartSettingsStore } = this.props;
    lineChartSettingsStore.animation[option] = value;
    console.log(lineChartSettingsStore.animation);
    lineChartSettingsStore.lineChartObject.update();
  }

  @action.bound
  onLegendOptionChange(option, value) {
    const { lineChartSettingsStore } = this.props;
    lineChartSettingsStore.legend[option] = value;
    console.log(lineChartSettingsStore.legend);
  }

  @action.bound
  onLabelsOptionChange(option, value) {
    const { lineChartSettingsStore } = this.props;
    lineChartSettingsStore.legend.labels[option] = value;
    console.log(lineChartSettingsStore.legend);
  }

  @action.bound
  onFontColorChange(value) {
    const { lineChartSettingsStore } = this.props;
    lineChartSettingsStore.legend.labels.fontColor = value.hex;
    console.log(lineChartSettingsStore.legend.labels.fontColor);
  }

  @action.bound
  onTitleOptionChange(option,value) {
    const { lineChartSettingsStore } = this.props;
    lineChartSettingsStore.title[option] = value;
    console.log(lineChartSettingsStore.title);
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
            <div className="label-wrapper">
              <div className="label-wrapper__label">Duration</div>
              <Button
                className="label-info" 
                textColor="pink"    
                onClick={this.goToNewChart} 
              >
                <InfoIcon width={10} height={10}/>
              </Button>
            </div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1000}
              defaultValue={lineChartSettingsStore.animation.duration}
              value={lineChartSettingsStore.animation.duration}
              onChange={value => this.onAnimationChange('duration',value)}
            />
          </div>
          <div className="option-wrapper">
          <div className="label-wrapper">
            <div className="label-wrapper__label">Easing</div>
            <Button
              className="label-info" 
              textColor="pink"    
              onClick={this.goToNewChart} 
            >
              <InfoIcon width={10} height={10}/>
            </Button>
          </div>
            <Dropdown 
              options={animationOptions} 
              value={lineChartSettingsStore.animation.easing}
              onChange={value => this.onAnimationChange('easing',value.value)}
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
            <OptionSectionHeader title="Legend configuration" />
          }
        >
          <div className="option-wrapper">
            <div className="label">Display</div>
            <Switch
              style={{ width: 80 }}
              checked={lineChartSettingsStore.legend.display}
              onChange={value => this.onLegendOptionChange('display', value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Position</div>
            <Dropdown 
              options={labelsPositionOptions} 
              placeholder="Select position" 
              value={lineChartSettingsStore.legend.position}
              onChange={value => this.onLegendOptionChange('position',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Box width</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.legend.labels.boxWidth}
              value={lineChartSettingsStore.legend.labels.boxWidth}
              onChange={value => this.onLabelsOptionChange('boxWidth',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Font size</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.legend.labels.fontSize}
              value={lineChartSettingsStore.legend.labels.fontSize}
              onChange={value => this.onLabelsOptionChange('fontSize',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Font style</div>
            <Dropdown 
              options={['normal','bold', 'italic']} 
              placeholder="Select position" 
              value={lineChartSettingsStore.legend.labels.fontStyle}
              onChange={value => this.onLegendOptionChange('fontStyle',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Font color</div>
            <ContextMenu 
              className="option-settings"
              position="leftBottom" 
              body={
                <ChromePicker 
                  color={lineChartSettingsStore.legend.labels.fontColor} 
                  onChange={color => this.onFontColorChange(color)}  
                />
              }
            >
            <ColorInput color={lineChartSettingsStore.legend.labels.fontColor} />
          </ContextMenu>
          </div>
          <div className="option-wrapper">
            <div className="label">Font family</div>
            <Dropdown 
              options={['Helvetica', 'Arial','Ubuntu', 'Cambria']} 
              placeholder="Select position" 
              value={lineChartSettingsStore.legend.labels.fontFamily}
              onChange={value => this.onLegendOptionChange('fontFamily',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label-wrapper">
              <div className="label-wrapper__label">Padding</div>
              <Button
                className="label-info" 
                textColor="pink"    
                onClick={this.goToNewChart} 
              >
                <InfoIcon width={10} height={10}/>
              </Button>
            </div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.legend.labels.padding}
              value={lineChartSettingsStore.legend.labels.padding}
              onChange={value => this.onAnimationChange('duration',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label-wrapper">
              <div className="label-wrapper__label">Use point style</div>
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
              checked={lineChartSettingsStore.legend.labels.usePointStyle}
              onChange={value => this.onLabelsOptionChange('usePointStyle', value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label-wrapper">
              <div className="label-wrapper__label">Full width</div>
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
              checked={lineChartSettingsStore.legend.fullWidth}
              onChange={value => this.onLegendOptionChange('fullWidth', value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label-wrapper">
              <div className="label-wrapper__label">Reverse legend datasets</div>
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
              checked={lineChartSettingsStore.legend.reverse}
              onChange={value => this.onLegendOptionChange('reverse', value)}
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
            <OptionSectionHeader title="Chart title" />
          }
        >
          <div className="option-wrapper">
            <div className="label">Display</div>
            <Switch
              style={{ width: 80 }}
              checked={lineChartSettingsStore.title.display}
              onChange={value => this.onTitleOptionChange('display', value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Text</div>
            <Input
              type="text"
              inputClassName="title-input"
              value={lineChartSettingsStore.title.text}
              onChange={value => this.onTitleChange(value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Position</div>
            <Dropdown 
              options={labelsPositionOptions} 
              placeholder="Select position" 
              value={lineChartSettingsStore.legend.position}
              onChange={value => this.onTitleOptionChange('position',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Font size</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.title.fontSize}
              value={lineChartSettingsStore.title.fontSize}
              onChange={value => this.onTitleOptionChange('fontSize',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label-wrapper">
              <div className="label-wrapper__label">Line height</div>
              <Button
                className="label-info" 
                textColor="pink"    
                onClick={this.goToNewChart} 
              >
                <InfoIcon width={10} height={10}/>
              </Button>
            </div>
            <InputNumber
              style={{ width: 80 }}
              precision={1}
              step={0.1}
              defaultValue={lineChartSettingsStore.title.lineHeight}
              value={lineChartSettingsStore.title.lineHeight}
              onChange={value => this.onTitleOptionChange('lineHeight',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Font style</div>
            <Dropdown 
              options={['normal','bold', 'italic']} 
              placeholder="Select position" 
              value={lineChartSettingsStore.title.fontStyle}
              onChange={value => this.onTitleOptionChange('fontStyle',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Font color</div>
            <ContextMenu 
              className="option-settings"
              position="leftBottom" 
              body={
                <ChromePicker 
                  color={lineChartSettingsStore.title.fontColor} 
                  onChange={color => this.onTitleOptionChange('fontColor',color.hex)}  
                />
              }
            >
            <ColorInput color={lineChartSettingsStore.title.fontColor} />
          </ContextMenu>
          </div>
          <div className="option-wrapper">
            <div className="label">Font family</div>
            <Dropdown 
              options={['Helvetica', 'Arial','Ubuntu', 'Cambria']} 
              placeholder="Select position" 
              value={lineChartSettingsStore.title.fontFamily}
              onChange={value => this.onTitleOptionChange('fontFamily',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
        </Collapsible>
        
      </div>
    );
  }
}