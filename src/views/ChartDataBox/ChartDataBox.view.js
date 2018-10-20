import React, { Component } from 'react';
import { observer } from 'mobx-react';
// components
import Table from './../../common/components/Table/Table';
import Button from './../../common/components/Button/Button';

// styles
import './ChartDataBox.view.scss';

@observer
export default class ChartDataBox extends Component {

  render() {
    return (
      <div className="chart-data-box">
        <div className="chart-data-options">
          <div className="table-buttons">
            <Button 
              className="add-button"
              onClick={() => {}}
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
              Import data
            </Button>
          </div>
        </div>
        <Table />
      </div>
    );
  }
}