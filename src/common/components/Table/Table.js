import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { find, indexOf, uniqueId, map, capitalize, toLower, includes, mapKeys, slice } from 'lodash';
import { Bind } from 'lodash-decorators';
import { observable, action, extendObservable } from 'mobx';

// services
import NotificationService from '../../services/notifications';

// stores
import { DataStore } from '../../../stores/data';
import { CommonStore } from '../../../stores/common';

// icons
import DeleteIcon from '../../icons/delete.svg';
import Delete2Icon from '../../icons/delete2.svg';
import EditIcon from '../../icons/edit.svg';

// components
import Button from '../Button/Button';
import Input from '../Input/Input';
import CustomModal from '../CustomModal/CustomModal';
import Dataset from '../Dataset/Dataset';

// styles
import './Table.scss';

@observer
export default class Table extends Component {
  static propTypes = {
    dataStore: PropTypes.instanceOf(DataStore).isRequired,
    commonStore: PropTypes.instanceOf(CommonStore).isRequired
  }

  @observable isRowEditPopupShown = false;
  @observable isEditColumnNamePopupShown = false;
  
  @observable editingRow = {};
  @observable editingColumn = {
    index: null,
    text: ''
  }

  @action.bound
  showEditRowPopup(row) {
    this.editingRow = row;
    this.isRowEditPopupShown = true;
  }

  @action.bound
  hideEditRowPopup() {
    this.isRowEditPopupShown = false;
  }

  @action.bound
  showEditColumnNamePopup(column) {
    const { dataStore } = this.props;
    const indexOfColumn = indexOf(dataStore.columns,column);
    this.editingColumn = {
      index: indexOfColumn,
      text: column
    }
    this.isEditColumnNamePopupShown = true;
  }

  @action.bound
  hideEditColumnNamePopup() {
    this.editingColumn = {};
    this.isEditColumnNamePopupShown = false;
  }

  @action.bound
  onColumnNameChange(event) {
    const newColumnName = event.target.value;
    this.editingColumn.text = newColumnName;
  }

  @action.bound
  saveColumnName() {
    const { dataStore, commonStore } = this.props;
    dataStore.columns[this.editingColumn.index] = toLower(this.editingColumn.text);
    const newRows = map(dataStore.rows, row => {
      const keyToEdit = Object.keys(row)[this.editingColumn.index + 1] // first is id
      const newRow = mapKeys(row, (value, key) => {
        if(key === keyToEdit) {
          return this.editingColumn.text
        }
        return key;
      })
      return newRow;
    });
    dataStore.rows = newRows;
    commonStore.lineChartObject.data.labels[this.editingColumn.index] = this.editingColumn.text;
    // update chart
    commonStore.updateChart();
    this.hideEditColumnNamePopup();
  }

  @action.bound
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @action.bound
  addRow(datasetProperties){
    const { dataStore, commonStore } = this.props;
    const { columns } = dataStore;
    if(columns.length > 0) {
      const newRow = {};
      map(columns, column => {
        newRow[column] = this.getRandomInt(100,1000).toString();
      })
      newRow.id = uniqueId('row_');
      dataStore.addRow(newRow);
      const arrayOfData = Object.values(newRow);
      const formattedDataset = slice(arrayOfData, 0, arrayOfData.length - 1);
      commonStore.lineChartObject.data.labels = dataStore.columns.slice();
      const newChart = {
        ...datasetProperties,
        data: formattedDataset
      }
      commonStore.addDataset(newChart);
    } else {
      NotificationService.error("There is no column!");
    }
  }

  @action.bound
  addColumn(columnName="Undefined column", randomFrom=null, randomTo=null, initialRowValue) {
    const { dataStore, commonStore } = this.props;
    const newColumn = toLower(columnName);
    const isColumn = includes(dataStore.columns,newColumn);
    if(!isColumn) {
      dataStore.columns.push(newColumn);
      commonStore.lineChartObject.data.labels.push(newColumn);
      if(dataStore.rows.length > 0) {
        if(randomFrom !== null && randomTo !== null) {
          map(dataStore.rows, (row, index) => {
            const randomValue = this.getRandomInt(randomFrom, randomTo).toString();
            extendObservable(row, { 
                [newColumn]: randomValue
              }
            );
            commonStore.lineChartObject.data.datasets[index].data.push(randomValue);
          });
        } else {
          map(dataStore.rows, (row, index) => {
            const initialValue = initialRowValue.toString();
            extendObservable(row, { 
              [newColumn]: initialValue
            });
            commonStore.lineChartObject.data.datasets[index].data.push(initialValue);
          });
        }
      }
      commonStore.updateChart();
    } else {
      NotificationService.error("This column name existing");
    }
  }

  @action.bound
  removeRow(rowId) {
    const { dataStore, commonStore } = this.props;
    const objectToRemove = find(dataStore.rows, {
      id: rowId
    });
    const indexOfRemovingRow = indexOf(dataStore.rows, objectToRemove);
    commonStore.lineChartObject.data.datasets.splice(indexOfRemovingRow, 1);
    dataStore.chartDatasetsProperties.splice(indexOfRemovingRow, 1);
    dataStore.rows.remove(objectToRemove);
    commonStore.updateChart();
  }

  @action.bound
  removeColumn(columnName) {
    const { dataStore, commonStore } = this.props;
    const indexOfObjectToRemove = indexOf(dataStore.columns, columnName);
    dataStore.columns.splice(indexOfObjectToRemove,1);
    map(dataStore.rows, row => {
      delete row[columnName];
    })
    commonStore.lineChartObject.data.labels.splice(indexOfObjectToRemove, 1);
    commonStore.lineChartObject.data.datasets.forEach((dataset) => {
      dataset.data.splice(indexOfObjectToRemove, 1);
    });
    commonStore.updateChart();
  }

  @Bind()
  renderEditRowPopupBody(){
    return Object.keys(this.editingRow).map((key,index) => key !== 'id' && (
      <div key={index-1}>
        <div className="option">
          <div className="label">{capitalize(key)}</div>
        </div>
        <Input
          key={index-1}
          type="number"
          value={this.editingRow[key]}
          onChange={event => this.handleRowChange(event,key)} 
          inputClassName="input-n"
        />
      </div>
    ))
  }

  @action.bound
  handleRowChange(event, key) {
    this.editingRow[key] = event.target.value;
  } 

  @action.bound
  saveRow() {
    const { dataStore, commonStore } = this.props;
    const indexOfEditingRow = indexOf(dataStore.rows, this.editingRow);
    map(dataStore.rows, row => {
      if(row.id === this.editingRow.id) {
        return row = this.editingRow;
      }
    });
    const arrayOfData = Object.values(this.editingRow).filter(value => !includes(value,"row_"));
    commonStore.lineChartObject.data.datasets[indexOfEditingRow].data = arrayOfData;
    commonStore.updateChart();
    this.editingRow = {};
    this.hideEditRowPopup();
  }

  render() {
    const { dataStore } = this.props;
    const { columns, rows } = dataStore;

    const EditRowPopup = (
      <CustomModal
        title="Edit row"
        width="360" 
        height="444" 
        effect="fadeInDown" 
        visible={this.isRowEditPopupShown} 
        onClose={this.hideEditRowPopup}
        isFooter={true}
        buttonRight={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="add-column-button"
            onClick={this.saveRow}
          >
            Save
          </Button>
        }
      >
        {this.renderEditRowPopupBody()}
      </CustomModal>
    );

    const EditColumnPopup = (
      <CustomModal
        title="Edit column"
        width="430" 
        height="220" 
        effect="fadeInDown" 
        visible={this.isEditColumnNamePopupShown} 
        onClose={this.hideEditColumnNamePopup}
        isFooter={true}
        buttonRight={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="export-button"
            onClick={this.saveColumnName}
          >
            Change
          </Button>
        }
      >
        <React.Fragment>
          <div className="option">
            <div className="label">Column name</div>
          </div>
          <Input 
            type="text" 
            value={this.editingColumn.text}
            onChange={this.onColumnNameChange} 
            inputClassName="column-input"
          />
        </React.Fragment>
      </CustomModal>
    );

    const editRowButton = row => (
      <Button key={uniqueId()} className="edit-button" onClick={() => this.showEditRowPopup(row)}>
        <EditIcon 
          className="edit-button"  
          width={14} 
          height={14} 
        />
      </Button>
    );

    const removeRowButton = index => (
      <Button key={index} className="remove-button" onClick={() => this.removeRow(index)}>
        <DeleteIcon 
          className="remove-button"  
          width={14} 
          height={14} 
        />
      </Button>
    );

    const removeColumnButton = column => (
      <Button key={uniqueId()} className="remove-column-button" onClick={() => this.removeColumn(column)}>
        <Delete2Icon 
          width={11} 
          height={11} 
        />
      </Button>
    );

    return (
      <div className="table-wrapper">
        <table id='table'>
          <thead>
            <tr>{map(columns,column => (
              <th key={uniqueId()}>
                <div className="column-cell-wrapper">
                  {<div title="Edit this column" role="button" onClick={() => this.showEditColumnNamePopup(column)}>{capitalize(column)}</div>}
                  {removeColumnButton(column)}
                </div>
              </th>))}
            </tr>
          </thead>
          <tbody>
            {map(rows, (row,indexR) => (<tr key={row.id}>{
              map(Object.values(row), (value, indexC) => {
                if(indexC === 0) return ( 
                  <td key={indexC}>
                    <div className="dataset-button">
                      <Dataset key={row.id} datasetIndex={indexR} />
                    </div>
                    {!includes(value,'row_') && value}
                  </td>
                );
                if(!includes(value,'row_')) return <td key={indexC}>{value}</td>
              })}
              <React.Fragment>
                <td key={uniqueId()}>
                  {editRowButton(row)}
                </td>
                <td key={uniqueId()}>
                  {removeRowButton(row.id)}
                </td>
              </React.Fragment>
            </tr>))}
          </tbody>
        </table>
        {EditRowPopup}
        {EditColumnPopup}
      </div>
    );
  }
}