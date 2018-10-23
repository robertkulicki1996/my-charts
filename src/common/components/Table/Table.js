import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Bind } from 'lodash-decorators';
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
    'Field',
    'Country'
  ];

  @observable rows = [
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany',
      'Maria Anders'
    ],
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany',
      'Maria Anders'
    ],
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany',
      'Maria Anders'
    ],
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany',
      'Maria Anders'
    ],
    [
      'Alfreds Futterkiste',
      'Maria Anders',
      'Germany',
      'Maria Anders'
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

  @Bind()
  showIndex(x) {
    console.log(x);
  }


  render() {
    const { columns, rows } = this;
    return (
      <table>
        <thead>
          <tr>{columns.map(column => (<th>{column}</th>))}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (<tr>{row.map((cell) => (<td onClick={this.showIndex(this)}>{cell}</td>))}
            <td><DeleteIcon className="remove-button" width={14} height={14} /></td>
          </tr>))}
        </tbody>
      </table>
    );
  }
}