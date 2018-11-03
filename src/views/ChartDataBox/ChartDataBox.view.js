import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { action, observable, runInAction } from 'mobx';

// components
import Table from './../../common/components/Table/Table';
import Button from './../../common/components/Button/Button';
import Input from './../../common/components/Input/Input';
import InputNumber from './../../common/components/InputNumber/InputNumber';
import Switch from './../../common/components/Switch/Switch';
import CustomModal from './../../common/components/CustomModal/CustomModal';

// icons
import ExportIcon from './../../common/icons/export.svg';
import ImportIcon from './../../common/icons/import.svg';
import SaveIcon from './../../common/icons/save.svg';

// styles
import './ChartDataBox.view.scss';

@observer
export default class ChartDataBox extends Component {
  constructor(props) {
    super(props);
    this.table = React.createRef();
  }

  @observable isAddColumnPopupShown = false;
  @observable newColumnName = '';
  @observable isRandomValuesDisabled = true;
  @observable randomFrom = 0;
  @observable randomTo = 100;

  componentDidMount() {
    runInAction(() => {
      this.newColumnName = 'Column-' + (this.table.current.columns.length + 1);
    })
  }

  @action.bound
  handleColumnName(event) {
    this.newColumnName = event.target.value;
  }

  @action.bound
  onRandomValuesChange() {
    this.isRandomValuesDisabled = !this.isRandomValuesDisabled;
  }

  @action.bound
  onRandomFromChange(value) {
    console.log(value);
    this.randomFrom = value;
  }

  @action.bound
  onRandomToChange(value) {
    this.randomTo = value;
  }

  @action.bound
  addRow() {
    this.table.current.addRow();
  }

  @action.bound
  addColumn() {
    this.showAddColumnPopup();
    // this.table.current.addColumn();
  }

  @action.bound
  showAddColumnPopup() {
    this.isAddColumnPopupShown = true;
  }

  @action.bound
  hideAddColumnPopup() {
    this.isAddColumnPopupShown = false;
  }

  render() {
    const AddColumnPopup = (
      <CustomModal
        title="Create data column"
        width="300" 
        height="320" 
        effect="fadeInDown" 
        visible={this.isAddColumnPopupShown} 
        onClose={this.hideAddColumnPopup}
        isFooter={true}
        buttonRight={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="add-column-button"
            onClick={this.addColumn}
          >
            Add 
          </Button>
        }
      >
        <React.Fragment>
          <div className="option">
            <div className="label">Column name</div>
          </div>
          <Input 
            type="text" 
            value={this.newColumnName}
            onChange={this.handleColumnName} 
            inputClassName="column-input"
          />
          <div className="option">
            <div className="label">Generate random values</div>
            <Switch
              style={{ width: 80 }}
              defaultValue={800}
              onChange={this.onRandomValuesChange}
              precision={0}
            />
          </div>
          <div className="option">
            <InputNumber 
              style={{ marginRight: 16 }}
              defaultValue={0}
              precision={0}
              step={1}
              value={this.randomFrom}
              onChange={this.onRandomFromChange}
              disabled={this.isRandomValuesDisabled}

            />
            <InputNumber 
              defaultValue={100}
              precision={0}
              step={1}
              value={this.randomTo}
              onChange={this.onRandomToChange}
              disabled={this.isRandomValuesDisabled}
            />
          </div>
        </React.Fragment>
      </CustomModal>
    );

    return (
      <div className="chart-data-box">
        <div className="chart-data-options">
          <div className="table-buttons">
            <Button 
              className="add-button"
              onClick={this.addRow}
            >
              Add Row
            </Button>
            <Button 
              className="add-button"
              onClick={this.addColumn}
            >
              Add Column
            </Button>
          </div>
          <div className="table-buttons">
            <Button 
              className="add-button"
              onClick={() => {}}
            >
            <div className="button-label">
              <div className="label">Import data</div>
              <ImportIcon width={14} height={14} />
            </div>
            </Button>
            <Button 
              className="add-button"
              onClick={() => {}}
            >
            <div className="button-label">
              <div className="label">Save</div>
              <SaveIcon width={14} height={14} />
            </div>
            </Button>
            <Button 
              className="add-button"
              onClick={() => {}}
            >
            <div className="button-label">
              <div className="label">Export chart</div>
              <ExportIcon width={14} height={14} />
            </div>
            </Button>
          </div>
        </div>
        <Table ref={this.table}/>
        {AddColumnPopup}
      </div>
    );
  }
}