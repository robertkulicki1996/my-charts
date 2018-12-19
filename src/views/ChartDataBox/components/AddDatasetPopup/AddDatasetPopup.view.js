import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import { noop } from 'lodash';

// models
import { LineDatasetProperties } from '../../../../models/LineDatasetProperties';

// stores
import { DataStore } from '../../../../stores/data';

// components
import Button from './../../../../common/components/Button/Button';
import Input from './../../../../common/components/Input/Input';
import ColorInput from './../../../../common/components/ColorInput/ColorInput';
import ContextMenu from '../../../../common/components/ContextMenu/ContextMenu';
import CustomModal from '../../../../common/components/CustomModal/CustomModal';
import Switch from '../../../../common/components/Switch/Switch';
import InputNumber from '../../../../common/components/InputNumber/InputNumber';
import { ChromePicker } from 'react-color';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// styles
import './AddDatasetPopup.view.scss';

@inject('dataStore')
@observer
export default class AddDatasetPopup extends Component {
  static propTypes = {
    dataStore: PropTypes.instanceOf(DataStore).isRequired,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    addRow: PropTypes.func
  } 

  static defaultProps = {
    visible: false,
    onClose: noop,
    addRow: noop
  }

  @observable currentDatasetObject = new LineDatasetProperties();

  @action.bound
  onLabelChange(e) {
    this.currentDatasetObject.label = e.target.value;
  }

  @action.bound
  onDatasetPropertiesChange(field, value) {
    this.currentDatasetObject[field] = value;
  }

  @action.bound
  addDataset() {
    this.props.dataStore.chartDatasetsProperties.push(this.currentDatasetObject);
    this.props.addRow(this.currentDatasetObject);
    this.props.onClose();
  }

  render() {
    const { visible, onClose } = this.props;

    return(
      <CustomModal
        title="Add dataset"
        width="430" 
        height="480" 
        effect="fadeInDown" 
        visible={visible} 
        onClose={onClose}
        isFooter={true}
        buttonRight={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="export-button"
            onClick={this.addDataset}
          >
            Add dataset
          </Button>
        }
      >
        <div className="option-wrapper">
          <div className="option-wrapper__label">Label</div>
          <Input
            type="text"
            inputClassName="option-wrapper__custom-input"
            value={this.currentDatasetObject.label}
            onChange={this.onLabelChange}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Background color</div>
          <ContextMenu 
            className="option-settings"
            position="leftBottom" 
            body={
              <ChromePicker 
                color={this.currentDatasetObject.backgroundColor} 
                onChange={color => this.onDatasetPropertiesChange('backgroundColor', color.hex)}  
              />
            }
          >
            <ColorInput color={this.currentDatasetObject.backgroundColor} />
          </ContextMenu>
        </div>
        <div className="option-wrapper">
          <div className="label">Border color</div>
          <ContextMenu 
            className="option-settings"
            position="leftBottom" 
            body={
              <ChromePicker 
                color={this.currentDatasetObject.borderColor} 
                onChange={color => this.onDatasetPropertiesChange('borderColor', color.hex)}  
              />
            }
          >
            <ColorInput color={this.currentDatasetObject.borderColor} />
          </ContextMenu>
        </div>
        <div className="option-wrapper">
          <div className="label">Border width</div>
          <InputNumber
            style={{ width: 80 }}
            precision={0}
            step={1}
            defaultValue={this.currentDatasetObject.borderWidth}
            value={this.currentDatasetObject.borderWidth}
            onChange={value => this.onDatasetPropertiesChange('borderWidth',value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Border cap style</div>
          <Dropdown 
            options={['butt', 'round', 'square']} 
            placeholder="Select" 
            value={this.currentDatasetObject.borderCapStyle}
            onChange={value => this.onDatasetPropertiesChange('borderCapStyle', value.value)}
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
            value={this.currentDatasetObject.borderJoinStyle}
            onChange={value => this.onDatasetPropertiesChange('borderJoinStyle', value.value)}
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
            value={this.currentDatasetObject.borderJoinStyle}
            onChange={value => this.onDatasetPropertiesChange('cubicInterpolationMode', value.value)}
            controlClassName='custom-dropdown'
            placeholderClassName='custom-placeholder'
            arrowClassName='custom-arrow'
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Fill</div>
          <Switch
            style={{ width: 80 }}
            checked={this.currentDatasetObject.fill}
            onChange={value => this.onDatasetPropertiesChange('fill', value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Line tension</div>
          <InputNumber
            style={{ width: 80 }}
            precision={0}
            step={1}
            defaultValue={this.currentDatasetObject.borderWidth}
            value={this.currentDatasetObject.borderWidth}
            onChange={value => this.onDatasetPropertiesChange('lineTension',value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Point background color</div>
          <ContextMenu 
            className="option-settings"
            position="leftBottom" 
            body={
              <ChromePicker 
                color={this.currentDatasetObject.pointBackgroundColor} 
                onChange={color => this.onDatasetPropertiesChange('pointBackgroundColor', color.hex)}  
              />
            }
          >
            <ColorInput color={this.currentDatasetObject.pointBackgroundColor} />
          </ContextMenu>
        </div>
        <div className="option-wrapper">
          <div className="label">Point border color</div>
          <ContextMenu 
            className="option-settings"
            position="leftBottom" 
            body={
              <ChromePicker 
                color={this.currentDatasetObject.pointBorderColor} 
                onChange={color => this.onDatasetPropertiesChange('pointBorderColor', color.hex)}  
              />
            }
          >
            <ColorInput color={this.currentDatasetObject.pointBorderColor} />
          </ContextMenu>
        </div>
        <div className="option-wrapper">
          <div className="label">Point border width</div>
          <InputNumber
            style={{ width: 80 }}
            precision={0}
            step={1}
            defaultValue={this.currentDatasetObject.pointBorderWidth}
            value={this.currentDatasetObject.pointBorderWidth}
            onChange={value => this.onDatasetPropertiesChange('pointBorderWidth',value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Point radius</div>
          <InputNumber
            style={{ width: 80 }}
            precision={0}
            step={1}
            defaultValue={this.currentDatasetObject.pointRadius}
            value={this.currentDatasetObject.pointRadius}
            onChange={value => this.onDatasetPropertiesChange('pointRadius',value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Point rotation</div>
          <InputNumber
            style={{ width: 80 }}
            precision={0}
            step={1}
            defaultValue={this.currentDatasetObject.pointRotation}
            value={this.currentDatasetObject.pointRotation}
            onChange={value => this.onDatasetPropertiesChange('pointRotation',value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Point hit radius</div>
          <InputNumber
            style={{ width: 80 }}
            precision={0}
            step={1}
            defaultValue={this.currentDatasetObject.pointHitRadius}
            value={this.currentDatasetObject.pointHitRadius}
            onChange={value => this.onDatasetPropertiesChange('pointHitRadius',value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Point hover background color</div>
          <ContextMenu 
            className="option-settings"
            position="leftBottom" 
            body={
              <ChromePicker 
                color={this.currentDatasetObject.pointHoverBackgroundColor} 
                onChange={color => this.onDatasetPropertiesChange('pointHoverBackgroundColor', color.hex)}  
              />
            }
          >
            <ColorInput color={this.currentDatasetObject.pointHoverBackgroundColor} />
          </ContextMenu>
        </div>
        <div className="option-wrapper">
          <div className="label">Point hover border color</div>
          <ContextMenu 
            className="option-settings"
            position="leftBottom" 
            body={
              <ChromePicker 
                color={this.currentDatasetObject.pointHoverBorderColor} 
                onChange={color => this.onDatasetPropertiesChange('pointHoverBorderColor', color.hex)}  
              />
            }
          >
            <ColorInput color={this.currentDatasetObject.pointHoverBorderColor} />
          </ContextMenu>
        </div>
        <div className="option-wrapper">
          <div className="label">Point hover border width</div>
          <InputNumber
            style={{ width: 80 }}
            precision={0}
            step={1}
            defaultValue={this.currentDatasetObject.pointHoverBorderWidth}
            value={this.currentDatasetObject.pointHoverBorderWidth}
            onChange={value => this.onDatasetPropertiesChange('pointHoverBorderWidth',value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Point hover radius</div>
          <InputNumber
            style={{ width: 80 }}
            precision={0}
            step={1}
            defaultValue={this.currentDatasetObject.pointHoverRadius}
            value={this.currentDatasetObject.pointHoverRadius}
            onChange={value => this.onDatasetPropertiesChange('pointHoverRadius',value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Show line</div>
          <Switch
            style={{ width: 80 }}
            checked={this.currentDatasetObject.showLine}
            onChange={value => this.onDatasetPropertiesChange('showLine', value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Span gaps</div>
          <Switch
            style={{ width: 80 }}
            checked={this.currentDatasetObject.spanGaps}
            onChange={value => this.onDatasetPropertiesChange('spanGaps', value)}
          />
        </div>
        <div className="option-wrapper">
          <div className="label">Stepped line</div>
          <Switch
            style={{ width: 80 }}
            checked={this.currentDatasetObject.steppedLine}
            onChange={value => this.onDatasetPropertiesChange('steppedLine', value)}
          />
        </div>
      </CustomModal>
    )
  }

}