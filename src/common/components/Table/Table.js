import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { remove, includes } from 'lodash';
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
    'Field'
  ];

  @observable rows = [
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany',
      'Maria Anders',
      'Alfreds Futterkiste',
    ],
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany',
      'Maria Anders',
      'Alfreds Futterkiste',
    ],
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany',
      'Maria Anders',
      'Alfreds Futterkiste',
    ],
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany',
      'Maria Anders',
      'Alfreds Futterkiste',
    ],
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany',
      'Maria Anders',
      'Alfreds Futterkiste',
    ],
  ];

  @observable existingIndexes = [];

  componentDidMount() {
    runInAction(() => {
      this.existingIndexes = Array.from(new Array(this.rows.length),(val,index) => index);
    })
  }

  @action.bound
  addRow(){
    const { columns, rows, existingIndexes } = this;
    let columnsCount = columns.length;
    const newRowData = [];
    while(columnsCount > 0) {
      newRowData.push(0);
      columnsCount--;
    }
    rows.push(newRowData);
    existingIndexes.push(existingIndexes.length);

    console.log(existingIndexes);
  }

  @action.bound
  removeRow(index) {
    const { rows, existingIndexes } = this;
    remove(this.rows[index]);
    // rows.splice(rows.indexOf(index),1);
    // console.log(index);
    // console.log(this.rows);
    // console.log(this.existingIndexes);
    existingIndexes.splice(existingIndexes.indexOf(index),1);
  }

  render() {
    const { columns, rows, existingIndexes } = this;

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
          {rows.map((row,index) => (<tr key={index}>{row.map((cell,index) => (<td key={index}>{cell}</td>))}
            {includes(existingIndexes, index) && (
              <td key={index}>
                {removeRowButton(index)}
              </td>
            )}
          </tr>))}
        </tbody>
      </table>
    );
  }
}