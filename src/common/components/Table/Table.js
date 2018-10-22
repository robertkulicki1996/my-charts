import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

// icons
import DeleteIcon from '../../icons/delete.svg';

// styles
import './Table.scss';

@observer
export default class Table extends Component {
  static propTypes = {

  }

  @observable columns = [
    'Company',
    'Contact',
    'Country'
  ];

  @observable rows = [
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany'
    ],
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany'
    ],
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany'
    ],
  ];

  @action.bound
  addRow(){
    const { columns, rows } = this;
    let columnsCount = columns.length;
    const newRowData = [];
    while(columnsCount > 0) {
      newRowData.push(0);
      columnsCount--;
    }
    rows.push(newRowData);
  }

  render() {
    const { columns, rows } = this;
    return (
      <table>
        <tr>{columns.map(column => (<th>{column}</th>))}</tr>
          {rows.map((row) => (<tr>{row.map((cell) => (<td>{cell}</td>))}
          <DeleteIcon className="remove-button" width={14} height={14} />
        </tr>))}
      </table>
    );
  }
}