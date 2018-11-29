import React, { Component } from 'react';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { remove, find, indexOf, uniqueId, map, capitalize, toLower, includes, mapKeys } from 'lodash';
import { Bind } from 'lodash-decorators';
import { observable, action, extendObservable } from 'mobx';

// services
import NotificationService from '../../services/notifications';

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
    rows: MobxPropTypes.observableArray.isRequired,
    columns: MobxPropTypes.observableArray.isRequired
  }

  @observable columns = [
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020'
  ];

  @observable rows = [
    {
      id: uniqueId('row_'),
      '2010': '100',
      '2011': '200',
      '2012': '300',
      '2013': '400',
      '2014': '500',
      '2015': '600',
      '2016': '700',
      '2017': '800',
      '2018': '900',
      '2019': '1000',
      '2020': '1100',

    },
    {
      id: uniqueId('row_'),
      '2010': '200',
      '2011': '400',
      '2012': '600',
      '2013': '800',
      '2014': '1000',
      '2015': '1200',
      '2016': '1400',
      '2017': '1600',
      '2018': '1800',
      '2019': '2000',
      '2020': '2200',
    },
  ];

  componentWillReceiveProps() {
    this.rows = this.props.rows;
    this.columns = this.props.columns;
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
    const indexOfColumn = indexOf(this.columns,column);
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
    this.columns[this.editingColumn.index] = toLower(this.editingColumn.text);
    const newRows = map(this.rows, row => {
      const keyToEdit = Object.keys(row)[this.editingColumn.index + 1] // first is id
      const newRow = mapKeys(row, (value,key) => {
        if(key === keyToEdit) {
          return this.editingColumn.text
        }
        return key;
      })
      return newRow;
    });
    this.rows = newRows;
    this.hideEditColumnNamePopup();
  }

  @action.bound
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @action.bound
  addRow(){
    const { columns, rows } = this;
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
    const newColumn = toLower(columnName);
    const indexOfColumn = includes(this.columns,newColumn);
    if(!indexOfColumn) {
      this.columns.push(newColumn);
      if(randomFrom !== null && randomTo !== null) {
        map(this.rows, row => {
          extendObservable(row, { 
              [newColumn]: this.getRandomInt(randomFrom, randomTo).toString() 
            }
          );
        })
      } else {
        map(this.rows, row => {
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
    map(this.rows, row => {
      if(row.id === this.editingRow.id) {
        row = this.editingRow;
      }
    });
    this.editingRow = {};
    this.hideEditRowPopup();
  }

  @action.bound
  removeRow(index) {
    const objectToRemove = find(this.rows, {id: index})
    remove(this.rows,objectToRemove);
  }

  @action.bound
  removeColumn(columnName) {
    const indexOfObjectToRemove = indexOf(this.columns, columnName);
    this.columns.splice(indexOfObjectToRemove,1);
    map(this.rows, row => {
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
    const { columns, rows } = this;

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
            {map(rows, row => (<tr key={uniqueId()}>{
              map(Object.values(row), (val, index) => {
                if (!includes(val,'row_')) return <td key={index}>{<Dataset name="xxx" color="blue" />}{val}</td>
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