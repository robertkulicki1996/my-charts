import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { remove, find, forEach, uniqueId, map, slice } from 'lodash';
import { Bind } from 'lodash-decorators';
import { observable, action, runInAction } from 'mobx';

// icons
import DeleteIcon from '../../icons/delete.svg';

// components
import Button from '../Button/Button';

// styles
import './Table.scss';

@observer
export default class Table extends Component {
  static propTypes = {

  }

  @observable columns = [
    'Company',
    'Contact',
    'Field',
    'Country',
    'Field2'
  ];

  @observable rows = [
    {
      id: uniqueId('row_'),
      company: 'Alfreds Futterkiste',
      contact: 'Maria Anders',
      filed: 'Germany',
      country: 'Maria Anders',
      filed2: 'Germany'
    },
    {
      id: uniqueId('row_'),
      company: 'Alfreds Futterkiste',
      contact: 'Maria Anders',
      filed: 'Germany',
      country: 'Maria Anders',
      filed2: 'Germany'
    },
    {
      id: uniqueId('row_'),
      company: 'Alfreds Futterkiste',
      contact: 'Maria Anders',
      filed: 'Germany',
      country: 'Maria Anders',
      filed2: 'Germany'
    },
  ];

  @action.bound
  addRow(){
    const { columns, rows } = this;
    const newRow = {};
    const newRowValue = 'Undefined row'
    newRow.id = uniqueId('row_');
    map(columns, column => {
      newRow[column] = newRowValue;
    })
    rows.push(newRow);
  }

  @action.bound
  addColumn(columnName="Undefined column") {
    const { columns, rows } = this;
    const newColumn = columnName;
    columns.push(newColumn);
    map(rows, row => {
      row[newColumn] = 'Undefined row'
    })
  }

  @action.bound
  removeRow(index) {
    const objectToRemove = find(this.rows, {id: index})
    remove(this.rows,objectToRemove);
  }

  render() {
    const { columns, rows } = this;

    const removeRowButton = (index) => (
      <Button key={index} className="remove-button" onClick={() => this.removeRow(index)}>
        <DeleteIcon 
          className="remove-button"  
          width={14} 
          height={14} 
        />
      </Button>
    );

    return (
      <table>
        <thead>
          <tr>{columns.map((column, index)=> (<th key={index}>{column}</th>))}</tr>
        </thead>
        <tbody>
          {map(rows, (row,index) => (<tr key={index}>{
            map(Object.values(row), (val, index) => {
              if (index > 0) return <td key={index}>{val}</td>
            })}
            <td key={index}>
              {removeRowButton(row.id)}
            </td>
          </tr>))}
        </tbody>
      </table>
    );
  }
}