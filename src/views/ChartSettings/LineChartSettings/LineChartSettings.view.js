import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import { map } from 'lodash';
import Collapsible from 'react-collapsible';
import ColorInput from '../../../common/components/ColorInput/ColorInput';
import OptionSectionHeader from '../../../views/Sidebar/components/OptionSectionHeader/OptionSectionHeader';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

import { observer, inject } from 'mobx-react';
import ContextMenu from '../../../common/components/ContextMenu/ContextMenu';
import InputNumber from '../../../common/components/InputNumber/InputNumber';
import Switch from '../../../common/components/Switch/Switch';
import Button from '../../../common/components/Button/Button';
import Input from '../../../common/components/Input/Input';
import DatasetListItem from '../../../common/components/DatasetListItem/DatasetListItem';

import InfoIcon from '../../../common/icons/info.svg';
import { ChromePicker } from 'react-color';

import { LineChartSettingsStore } from '../../../stores/ChartSettings/LineChartSettings';
import { CommonStore } from '../../../stores/common';
import { DataStore } from '../../../stores/data';

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

const pointStyles = [
  'circle',
  'cross',
  'crossRot',
  'dash',
  'line',
  'rect',
  'rectRounded',
  'rectRot',
  'star',
  'triangle'
];

const labelsPositionOptions = ['top','right','bottom','left'];

@inject('lineChartSettingsStore', 'commonStore', 'dataStore')
@observer
export default class LineChartSettings extends Component {
  static propTypes = {
    lineChartSettingsStore: PropTypes.instanceOf(LineChartSettingsStore).isRequired,
    commonStore: PropTypes.instanceOf(CommonStore).isRequired,
    dataStore: PropTypes.instanceOf(DataStore).isRequired
  }

  @action.bound
  onTitleChange(event) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.title.text = event.target.value;
    lineChartObject.options.title.text = event.target.value;
    lineChartObject.update();
  }

  @action.bound
  onOptionChange(option, value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore[option] = value;
    lineChartObject.options[option] = value;
    lineChartObject.update();
  }

  @action.bound
  onPaddingChange(option,value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.padding[option] = value;
    lineChartObject.options.layout.padding[option] = value;
    lineChartObject.update();
  }

  @action.bound
  onRGBColorChange(color) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    const rgbColor = color.rgb;
    const hexColor = color.hex;
    const formatedRgbToString = `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${rgbColor.a})`;

    lineChartSettingsStore.backgroundColor.rgba = formatedRgbToString;
    lineChartSettingsStore.backgroundColor.hex = hexColor;

    lineChartObject.update();
  }

  @action.bound
  onAnimationChange(option, value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.animation[option] = value;
    lineChartObject.options.animation[option] = value;
    lineChartObject.update();
  }

  @action.bound
  onLegendOptionChange(option, value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.legend[option] = value;
    lineChartObject.options.legend[option] = value;
    lineChartObject.update();
  }

  @action.bound
  onLabelsOptionChange(option, value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.legend.labels[option] = value;
    lineChartObject.options.legend.labels[option] = value;
    lineChartObject.update();
  }

  @action.bound
  onFontColorChange(value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.legend.labels.fontColor = value.hex;
    lineChartObject.options.legend.labels.fontColor = value.hex;
    lineChartObject.update();
  }

  @action.bound
  onTitleOptionChange(option,value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.title[option] = value;
    lineChartObject.options.title[option] = value;
    lineChartObject.update();
  }

  @action.bound
  onTooltipsOptionChange(option,value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.tooltips[option] = value;
    lineChartObject.options.tooltips[option] = value;
    lineChartObject.update();
  }

  @action.bound
  onTooltipsCallbacksChange(option,value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.tooltips.callbacks[option] = value;
    lineChartObject.options.tooltips.callbacks[option] = () => {
      return value
    }
    lineChartObject.update();
  }

  @action.bound
  onTooltipsCallbacksLabelBorderColorChange(option,value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.tooltips.callbacks.labelColor[option] = value;
    lineChartObject.options.tooltips.callbacks.labelColor = () => {
      return {
        borderColor: value,
        backgroundColor: lineChartSettingsStore.tooltips.callbacks.labelColor.backgroundColor
      }
    }
    lineChartObject.update();
  }

  @action.bound
  onTooltipsCallbacksLabelBackgroundColorChange(option,value) {
    const { lineChartSettingsStore, commonStore } = this.props;
    const { lineChartObject } = commonStore;

    lineChartSettingsStore.tooltips.callbacks.labelColor[option] = value;
    lineChartObject.options.tooltips.callbacks.labelColor = () => {
      return {
        borderColor: lineChartSettingsStore.tooltips.callbacks.labelColor.borderColor,
        backgroundColor: value
      }
    }
    lineChartObject.update();
  }

  @action.bound
  onLabelChange(e) {
    this.currentDatasetObject.label = e.target.value;
  }

  @action.bound
  addDataset() {
    this.props.dataStore.chartDatasetsProperties.push(this.currentDatasetObject);
    this.props.addRow(this.currentDatasetObject);
    this.props.onClose();
  }

  @action.bound
  handleLabel(e, index) {
    const { dataStore, commonStore } = this.props;
    const newValue = e.target.value;
    dataStore.chartDatasetsProperties[index].label = newValue;
    commonStore.editDataset(index, 'label', newValue);
  }

  @action.bound
  onDatasetPropertiesChange(field, value, index) {
    const { dataStore, commonStore } = this.props;
    dataStore.chartDatasetsProperties[index][field] = value;
    if(!dataStore.chartDatasetsProperties[index].fill) {
      dataStore.chartDatasetsProperties[index].backgroundColor = dataStore.chartDatasetsProperties[index].borderColor;
    }
    commonStore.editDataset(index, field, value);
    this.forceUpdate();
  }

  render() {
    const { lineChartSettingsStore, dataStore } = this.props;

    return (
      <div className="settings-wrapper">
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
        {/* <div className="option-wrapper">
          <div className="label-wrapper">
            <div className="label-wrapper__label">Maintain aspect ratio</div>
            <Tooltip
              title="Maintain the original canvas aspect ratio (width / height) when resizing."
              position="top"
              arrow={true}
              size="regular"
              trigger="click"
              theme="transparent"
            >
              <div className="label-info" >
                <InfoIcon width={10} height={10}/>
              </div>
            </Tooltip>
          </div>
          <Switch
            style={{ width: 80 }}
            checked={lineChartSettingsStore.maintainAspectRatio}
            onChange={value => this.onOptionChange('maintainAspectRatio', value)}
          />
        </div> */}
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
        <div className="option-wrapper-column">
            {map(dataStore.chartDatasetsProperties, (properties, index) => {
              return <Collapsible
                key={index}
                id={index}
                open={false}
                openedClassName="opened-section"
                triggerClassName="closed-section"
                height={300}
                trigger={
                  <DatasetListItem key={index} datasetIndex={index} />
                }
              >
                <div key={index} className="option-wrapper-column">
                  <div className="option-wrapper">
                    <div className="option-wrapper__label">Label</div>
                    <Input
                      key={index}
                      type="text"
                      inputClassName="option-wrapper__custom-input"
                      value={properties.label}
                      onChange={(e) => this.handleLabel(e, index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Background color</div>
                    <ContextMenu 
                      className="option-settings"
                      position="leftBottom" 
                      body={
                        <ChromePicker 
                          color={properties.backgroundColor} 
                          onChange={color => this.onDatasetPropertiesChange('backgroundColor', color.hex,index)}  
                        />
                      }
                    >
                      <ColorInput color={properties.backgroundColor} />
                    </ContextMenu>
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Border color</div>
                    <ContextMenu 
                      className="option-settings"
                      position="leftBottom" 
                      body={
                        <ChromePicker 
                          color={properties.borderColor} 
                          onChange={color => this.onDatasetPropertiesChange('borderColor', color.hex,index)}  
                        />
                      }
                    >
                      <ColorInput color={properties.borderColor} />
                    </ContextMenu>
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Border width</div>
                    <InputNumber
                      style={{ width: 80 }}
                      precision={0}
                      step={1}
                      value={properties.borderWidth}
                      onChange={value => this.onDatasetPropertiesChange('borderWidth',value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Border cap style</div>
                    <Dropdown 
                      options={['butt', 'round', 'square']} 
                      placeholder="Select" 
                      value={properties.borderCapStyle}
                      onChange={value => this.onDatasetPropertiesChange('borderCapStyle', value.value,index)}
                      controlClassName='custom-dropdown'
                      placeholderClassName='custom-placeholder'
                      arrowClassName='custom-arrow'
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Border join style</div>
                    <Dropdown 
                      options={['bevel', 'round', 'miter']} 
                      placeholder="Select" 
                      value={properties.borderJoinStyle}
                      onChange={value => this.onDatasetPropertiesChange('borderJoinStyle', value.value,index)}
                      controlClassName='custom-dropdown'
                      placeholderClassName='custom-placeholder'
                      arrowClassName='custom-arrow'
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Cubic interpolation mode</div>
                    <Dropdown 
                      options={['default', 'monotone']} 
                      placeholder="Select" 
                      value={properties.borderJoinStyle}
                      onChange={value => this.onDatasetPropertiesChange('cubicInterpolationMode', value.value,index)}
                      controlClassName='custom-dropdown'
                      placeholderClassName='custom-placeholder'
                      arrowClassName='custom-arrow'
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Fill</div>
                    <Switch
                      style={{ width: 80 }}
                      checked={properties.fill}
                      onChange={value => this.onDatasetPropertiesChange('fill', value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Line tension</div>
                    <InputNumber
                      style={{ width: 80 }}
                      precision={0}
                      step={1}
                      value={properties.borderWidth}
                      onChange={value => this.onDatasetPropertiesChange('lineTension',value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Point background color</div>
                    <ContextMenu 
                      className="option-settings"
                      position="leftBottom" 
                      body={
                        <ChromePicker 
                          color={properties.pointBackgroundColor} 
                          onChange={color => this.onDatasetPropertiesChange('pointBackgroundColor', color.hex,index)}  
                        />
                      }
                    >
                      <ColorInput color={properties.pointBackgroundColor} />
                    </ContextMenu>
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Point border color</div>
                    <ContextMenu 
                      className="option-settings"
                      position="leftBottom" 
                      body={
                        <ChromePicker 
                          color={properties.pointBorderColor} 
                          onChange={color => this.onDatasetPropertiesChange('pointBorderColor', color.hex,index)}  
                        />
                      }
                    >
                      <ColorInput color={properties.pointBorderColor} />
                    </ContextMenu>
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Point border width</div>
                    <InputNumber
                      style={{ width: 80 }}
                      precision={0}
                      step={1}
                      defaultValue={properties.pointBorderWidth}
                      value={properties.pointBorderWidth}
                      onChange={value => this.onDatasetPropertiesChange('pointBorderWidth',value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Point radius</div>
                    <InputNumber
                      style={{ width: 80 }}
                      precision={0}
                      step={1}
                      defaultValue={properties.pointRadius}
                      value={properties.pointRadius}
                      onChange={value => this.onDatasetPropertiesChange('pointRadius',value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Point rotation</div>
                    <InputNumber
                      style={{ width: 80 }}
                      precision={0}
                      step={1}
                      defaultValue={properties.pointRotation}
                      value={properties.pointRotation}
                      onChange={value => this.onDatasetPropertiesChange('pointRotation',value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Point hit radius</div>
                    <InputNumber
                      style={{ width: 80 }}
                      precision={0}
                      step={1}
                      defaultValue={properties.pointHitRadius}
                      value={properties.pointHitRadius}
                      onChange={value => this.onDatasetPropertiesChange('pointHitRadius',value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Point hover background color</div>
                    <ContextMenu 
                      className="option-settings"
                      position="leftBottom" 
                      body={
                        <ChromePicker 
                          color={properties.pointHoverBackgroundColor} 
                          onChange={color => this.onDatasetPropertiesChange('pointHoverBackgroundColor', color.hex,index)}  
                        />
                      }
                    >
                      <ColorInput color={properties.pointHoverBackgroundColor} />
                    </ContextMenu>
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Point hover border color</div>
                    <ContextMenu 
                      className="option-settings"
                      position="leftBottom" 
                      body={
                        <ChromePicker 
                          color={properties.pointHoverBorderColor} 
                          onChange={color => this.onDatasetPropertiesChange('pointHoverBorderColor', color.hex,index)}  
                        />
                      }
                    >
                      <ColorInput color={properties.pointHoverBorderColor} />
                    </ContextMenu>
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Point hover border width</div>
                    <InputNumber
                      style={{ width: 80 }}
                      precision={0}
                      step={1}
                      defaultValue={properties.pointHoverBorderWidth}
                      value={properties.pointHoverBorderWidth}
                      onChange={value => this.onDatasetPropertiesChange('pointHoverBorderWidth',value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Point hover radius</div>
                    <InputNumber
                      style={{ width: 80 }}
                      precision={0}
                      step={1}
                      defaultValue={properties.pointHoverRadius}
                      value={properties.pointHoverRadius}
                      onChange={value => this.onDatasetPropertiesChange('pointHoverRadius',value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Show line</div>
                    <Switch
                      style={{ width: 80 }}
                      checked={properties.showLine}
                      onChange={value => this.onDatasetPropertiesChange('showLine', value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Span gaps</div>
                    <Switch
                      style={{ width: 80 }}
                      checked={properties.spanGaps}
                      onChange={value => this.onDatasetPropertiesChange('spanGaps', value,index)}
                    />
                  </div>
                  <div className="option-wrapper">
                    <div className="label">Stepped line</div>
                    <Switch
                      style={{ width: 80 }}
                      checked={properties.steppedLine}
                      onChange={value => this.onDatasetPropertiesChange('steppedLine', value,index)}
                    />
                  </div>
                </div>
              </Collapsible>
            })}
          </div>
        <Collapsible 
          open={false} 
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
          open={false} 
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
              <Tooltip
                title="The number of milliseconds an animation takes."
                position="top"
                arrow={true}
                size="regular"
                trigger="click"
                theme="transparent"
              >
                <div className="label-info" >
                  <InfoIcon width={10} height={10}/>
                </div>
              </Tooltip>
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
              <Tooltip
                title="Easing function to use."
                position="top"
                arrow={true}
                size="regular"
                trigger="click"
                theme="transparent"
              >
                <div className="label-info" >
                  <InfoIcon width={10} height={10}/>
                </div>
              </Tooltip>
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
          open={false} 
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
              onChange={value => this.onLabelsOptionChange('fontStyle',value.value)}
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
              onChange={value => this.onLabelsOptionChange('fontFamily',value.value)}
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
              onChange={value => this.onLabelsOptionChange('padding',value)}
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
          open={false} 
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

        <Collapsible 
          open={false} 
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          height={300}
          trigger={
            <OptionSectionHeader title="Tooltip configuration for web use" />
          }
        >
          <div className="option-wrapper">
            <div className="label">Enabled</div>
            <Switch
              style={{ width: 80 }}
              checked={lineChartSettingsStore.tooltips}
              onChange={value => this.onTooltipsOptionChange('enabled', value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Mode</div>
            <Dropdown 
              options={['nearest', 'point', 'single', 'label', 'index','dataset', 'x','y']} 
              placeholder="Select mode" 
              value={lineChartSettingsStore.tooltips.mode}
              onChange={value => this.onTooltipsOptionChange('mode',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Intersect</div>
            <Switch
              style={{ width: 80 }}
              checked={lineChartSettingsStore.tooltips.intersect}
              onChange={value => this.onTooltipsOptionChange('intersect', value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Position</div>
            <Dropdown 
              options={['average', 'nearest']} 
              placeholder="Select position" 
              value={lineChartSettingsStore.tooltips.position}
              onChange={value => this.onTooltipsOptionChange('position',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Text before title</div>
            <Input
              type="text"
              className="tooltips-input-container"
              inputClassName="tooltips-input"
              value={lineChartSettingsStore.tooltips.callbacks.beforeTitle}
              onChange={event => this.onTooltipsCallbacksChange('beforeTitle',event.target.value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Text before body</div>
            <Input
              type="text"
              className="tooltips-input-container"
              inputClassName="tooltips-input"
              value={lineChartSettingsStore.tooltips.callbacks.beforeBody}
              onChange={event => this.onTooltipsCallbacksChange('beforeBody',event.target.value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Label border color</div>
            <ContextMenu 
              className="option-settings"
              position="leftBottom" 
              body={
                <ChromePicker 
                  color={lineChartSettingsStore.tooltips.callbacks.labelColor.borderColor} 
                  onChange={color => this.onTooltipsCallbacksLabelBorderColorChange('borderColor',color.hex)}  
                />
              }
            >
              <ColorInput color={lineChartSettingsStore.tooltips.callbacks.labelColor.borderColor} />
            </ContextMenu>
          </div>
          <div className="option-wrapper">
            <div className="label">Label background color</div>
            <ContextMenu 
              className="option-settings"
              position="leftBottom" 
              body={
                <ChromePicker 
                  color={lineChartSettingsStore.tooltips.callbacks.labelColor.backgroundColor} 
                  onChange={color => this.onTooltipsCallbacksLabelBackgroundColorChange('backgroundColor',color.hex)}  
                />
              }
            >
              <ColorInput color={lineChartSettingsStore.tooltips.callbacks.labelColor.backgroundColor} />
            </ContextMenu>
          </div>
          <div className="option-wrapper">
            <div className="label">Label text color</div>
            <ContextMenu 
              className="option-settings"
              position="leftBottom" 
              body={
                <ChromePicker 
                  color={lineChartSettingsStore.tooltips.callbacks.labelTextColor} 
                  onChange={color => this.onTooltipsCallbacksChange('labelTextColor',color.hex)}  
                />
              }
            >
              <ColorInput color={lineChartSettingsStore.tooltips.callbacks.labelTextColor} />
            </ContextMenu>
          </div>
          <div className="option-wrapper">
            <div className="label">Tooltip background color</div>
            <ContextMenu 
              className="option-settings"
              position="leftBottom" 
              body={
                <ChromePicker 
                  color={lineChartSettingsStore.tooltips.backgroundColor} 
                  onChange={color => this.onTooltipsOptionChange('backgroundColor',color.hex)}  
                />
              }
            >
              <ColorInput color={lineChartSettingsStore.tooltips.backgroundColor} />
            </ContextMenu>
          </div>
          <div className="option-wrapper">
            <div className="label">Title font family</div>
            <Dropdown 
              options={['Helvetica', 'Arial','Ubuntu', 'Cambria']} 
              placeholder="Select position" 
              value={lineChartSettingsStore.tooltips.titleFontFamily}
              onChange={value => this.onTooltipsOptionChange('titleFontFamily',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Title font size</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.titleFontSize}
              value={lineChartSettingsStore.tooltips.titleFontSize}
              onChange={value => this.onTooltipsOptionChange('titleFontSize',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Title font style</div>
            <Dropdown 
              options={['normal','bold', 'italic']} 
              placeholder="Select position" 
              value={lineChartSettingsStore.tooltips.titleFontStyle}
              onChange={value => this.onTooltipsOptionChange('titleFontStyle',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Title font color</div>
            <ContextMenu 
              className="option-settings"
              position="leftBottom" 
              body={
                <ChromePicker 
                  color={lineChartSettingsStore.tooltips.titleFontColor} 
                  onChange={color => this.onTooltipsOptionChange('titleFontColor',color.hex)}  
                />
              }
            >
              <ColorInput color={lineChartSettingsStore.tooltips.titleFontColor} />
            </ContextMenu>
          </div>
          <div className="option-wrapper">
            <div className="label">Title spacing</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.titleSpacing}
              value={lineChartSettingsStore.tooltips.titleSpacing}
              onChange={value => this.onTooltipsOptionChange('titleSpacing',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Title margin bottom</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.titleMarginBottom}
              value={lineChartSettingsStore.tooltips.titleMarginBottom}
              onChange={value => this.onTooltipsOptionChange('titleMarginBottom',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Body font family</div>
            <Dropdown 
              options={['Helvetica', 'Arial','Ubuntu', 'Cambria']} 
              placeholder="Select position" 
              value={lineChartSettingsStore.tooltips.bodyFontFamily}
              onChange={value => this.onTooltipsOptionChange('bodyFontFamily',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Body font size</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.bodyFontSize}
              value={lineChartSettingsStore.tooltips.bodyFontSize}
              onChange={value => this.onTooltipsOptionChange('bodyFontSize',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Body font style</div>
            <Dropdown 
              options={['normal','bold', 'italic']} 
              placeholder="Select position" 
              value={lineChartSettingsStore.tooltips.bodyFontStyle}
              onChange={value => this.onTooltipsOptionChange('bodyFontStyle',value.value)}
              controlClassName='custom-dropdown'
              placeholderClassName='custom-placeholder'
              arrowClassName='custom-arrow'
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Body font color</div>
            <ContextMenu 
              className="option-settings"
              position="leftBottom" 
              body={
                <ChromePicker 
                  color={lineChartSettingsStore.tooltips.bodyFontColor} 
                  onChange={color => this.onTooltipsOptionChange('bodyFontColor',color.hex)}  
                />
              }
            >
              <ColorInput color={lineChartSettingsStore.tooltips.titleFontColor} />
            </ContextMenu>
          </div>
          <div className="option-wrapper">
            <div className="label">Body spacing</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.bodySpacing}
              value={lineChartSettingsStore.tooltips.bodySpacing}
              onChange={value => this.onTooltipsOptionChange('bodySpacing',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">X padding</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.xPadding}
              value={lineChartSettingsStore.tooltips.xPadding}
              onChange={value => this.onTooltipsOptionChange('xPadding',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Y padding</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.yPadding}
              value={lineChartSettingsStore.tooltips.yPadding}
              onChange={value => this.onTooltipsOptionChange('yPadding',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Caret padding</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.caretPadding}
              value={lineChartSettingsStore.tooltips.caretPadding}
              onChange={value => this.onTooltipsOptionChange('caretPadding',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Caret size</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.caretSize}
              value={lineChartSettingsStore.tooltips.caretSize}
              onChange={value => this.onTooltipsOptionChange('caretSize',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Corner radius</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.cornerRadius}
              value={lineChartSettingsStore.tooltips.cornerRadius}
              onChange={value => this.onTooltipsOptionChange('cornerRadius',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Multi key background</div>
            <ContextMenu 
              className="option-settings"
              position="leftBottom" 
              body={
                <ChromePicker 
                  color={lineChartSettingsStore.tooltips.multiKeyBackground} 
                  onChange={color => this.onTooltipsOptionChange('multiKeyBackground',color.hex)}  
                />
              }
            >
              <ColorInput color={lineChartSettingsStore.tooltips.multiKeyBackground} />
            </ContextMenu>
          </div>
          <div className="option-wrapper">
            <div className="label">Display colors</div>
            <Switch
              style={{ width: 80 }}
              checked={lineChartSettingsStore.tooltips.displayColors}
              onChange={value => this.onTooltipsOptionChange('displayColors', value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Border width</div>
            <InputNumber
              style={{ width: 80 }}
              precision={0}
              step={1}
              defaultValue={lineChartSettingsStore.tooltips.borderWidth}
              value={lineChartSettingsStore.tooltips.borderWidth}
              onChange={value => this.onTooltipsOptionChange('borderWidth',value)}
            />
          </div>
          <div className="option-wrapper">
            <div className="label">Border color</div>
            <ContextMenu 
              className="option-settings"
              position="leftBottom" 
              body={
                <ChromePicker 
                  color={lineChartSettingsStore.tooltips.borderColor} 
                  onChange={color => this.onTooltipsOptionChange('borderColor',color.hex)}  
                />
              }
            >
              <ColorInput color={lineChartSettingsStore.tooltips.borderColor} />
            </ContextMenu>
          </div>
        </Collapsible>
        <Collapsible
          open={true}
          overflowWhenOpen='visible' 
          openedClassName="opened-section"
          triggerClassName="closed-section"
          height={300}
          trigger={
            <OptionSectionHeader title="Datasets" />
          }
        >
        </Collapsible>
      </div>
    );
  }
}