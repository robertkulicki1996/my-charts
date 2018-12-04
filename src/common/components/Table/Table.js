import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { remove, find, indexOf, uniqueId, map, capitalize, toLower, includes, mapKeys } from 'lodash';
import { Bind } from 'lodash-decorators';
import { observable, action, extendObservable } from 'mobx';

// services
import NotificationService from '../../services/notifications';

// stores
import { DataStore } from '../../../stores/data';

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
    dataStore: PropTypes.instanceOf(DataStore).isRequired
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
    this.editingColumn.text = event.target.value;
  }

  @action.bound
  saveColumnName() {
    const { dataStore } = this.props;
    dataStore.columns[this.editingColumn.index] = toLower(this.editingColumn.text);
    const newRows = map(dataStore.rows, row => {
      const keyToEdit = Object.keys(row)[this.editingColumn.index + 1] // first is id
      const newRow = mapKeys(row, (value,key) => {
        if(key === keyToEdit) {
          return this.editingColumn.text
        }
        return key;
      })
      return newRow;
    });
    dataStore.rows = newRows;
    this.hideEditColumnNamePopup();
  }

  @action.bound
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @action.bound
  addRow(){
    const { dataStore } = this.props;
    const { columns, rows } = dataStore;
    if(columns.length > 0) {
      const newRow = {};
      newRow.id = uniqueId('row_');
      map(columns, column => {
        newRow[column] = this.getRandomInt(1,100).toString();
      })
      rows.push(newRow);
    } else {
      NotificationService.error("There is no column!");
    }
  }

  @action.bound
  handleRowChange(event, key) {
    this.editingRow[key] = event.target.value;
  } 

  @action.bound
  addColumn(columnName="Undefined column", randomFrom=null, randomTo=null, initialRowValue) {
    const { dataStore } = this.props;
    const newColumn = toLower(columnName);
    const indexOfColumn = includes(dataStore.columns,newColumn);
    if(!indexOfColumn) {
      dataStore.columns.push(newColumn);
      if(randomFrom !== null && randomTo !== null) {
        map(dataStore.rows, row => {
          extendObservable(row, { 
              [newColumn]: this.getRandomInt(randomFrom, randomTo).toString() 
            }
          );
        })
      } else {
        map(dataStore.rows, row => {
          extendObservable(row, { 
            [newColumn]: initialRowValue.toString()
          });
        });
      }
    } else {
      NotificationService.error("This column name existing");
    }
  }

  @action.bound
  saveRow() {
    const { dataStore } = this.props;
    map(dataStore.rows, row => {
      if(row.id === this.editingRow.id) {
        row = this.editingRow;
      }
    });
    this.editingRow = {};
    this.hideEditRowPopup();
  }

  consoleLog(){
    console.log("asd");
  }

  @action.bound
  removeRow(index) {
    const { dataStore } = this.props;
    const objectToRemove = find(dataStore.rows, {
      id: index
    })
    remove(dataStore.rows,objectToRemove);
  }

  @action.bound
  removeColumn(columnName) {
    const { dataStore } = this.props;
    const indexOfObjectToRemove = indexOf(dataStore.columns, columnName);
    dataStore.columns.splice(indexOfObjectToRemove,1);
    map(dataStore.rows, row => {
      delete row[columnName];
    })
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  @Bind()
  renderEditRowPopupBody(){
    return Object.keys(this.editingRow).map((key,index) => 
      key !== 'id' && (
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
      <React.Fragment>
        <table>
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
            {map(rows, (row,index) => (<tr key={index}>{
              map(Object.values(row), (value, index) => {
                if(index === 0) return ( 
                  <td key={index}>
                    <div className="dataset-button">
                      <Dataset color="blue" />
                    </div>
                    {value}
                  </td>
                );
                if(!includes(value,'row_')) return <td key={index}>{value}</td>
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
      </React.Fragment>
    );
  }
}