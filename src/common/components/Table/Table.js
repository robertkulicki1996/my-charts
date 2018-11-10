import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { remove, find, indexOf, uniqueId, map, capitalize, toLower, forEach } from 'lodash';
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

// styles
import './Table.scss';

@observer
export default class Table extends Component {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  @observable columns = this.props.columns || [
    'column1',
    'column2',
    'column3',
    'column4'
  ] ;

  @observable rows = this.props.rows || [
    {
      id: uniqueId('row_'),
      column1: '110',
      column2: '320',
      column3: '320',
      column4: '420'
    },
    {
      id: uniqueId('row_'),
      column1: '150',
      column2: '420',
      column3: '330',
      column4: '420'
    },
    {
      id: uniqueId('row_'),
      column1: '150',
      column2: '320',
      column3: '340',
      column4: '420'
    }
  ];

  @observable isRowEditPopupShown = false;
  
  @observable editingRow = {};

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
        row[toLower(newColumn)] = initialRowValue.toString();
      })
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
            <tr>{columns.map(column => (
              <th key={uniqueId()}>
                {capitalize(column)}
                {removeColumnButton(column)}
              </th>))}
            </tr>
          </thead>
          <tbody>
            {map(rows, (row,index) => (<tr key={uniqueId()}>{
              map(Object.values(row), (val, index) => {
                if (index > 0) return <td key={index}>{val}</td>
              })}
              {this.columns.length > 0 && (
                <React.Fragment>
                  <td key={index + 1}>
                    {editRowButton(row)}
                  </td>
                  <td key={index + 2}>
                    {removeRowButton(row.id)}
                  </td>
                </React.Fragment>
              )}
            </tr>))}
          </tbody>
        </table>
        {EditRowPopup}
      </React.Fragment>
    );
  }
}