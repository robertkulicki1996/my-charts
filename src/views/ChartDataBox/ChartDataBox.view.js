import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

// components
import Table from './../../common/components/Table/Table';
import Button from './../../common/components/Button/Button';

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

  @action.bound
  addRow() {
    this.table.current.addRow();
  }

  render() {
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
              onClick={() => {}}
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
      </div>
    );
  }
}