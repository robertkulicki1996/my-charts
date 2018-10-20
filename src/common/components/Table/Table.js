import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import './Table.scss';

@observer
export default class Table extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div className="table-wrapper">
        <table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
            <th>Contact</th>
            <th>Contact</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Maria Anders</td>
            <td>Maria Anders</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Maria Anders</td>
            <td>Maria Anders</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>Maria Anders</td>
            <td>Roland Mendel</td>
            <td>Maria Anders</td>
            <td>Austria</td>
          </tr>
          <tr>
            <td>Island Trading</td>
            <td>Maria Anders</td>
            <td>Helen Bennett</td>
            <td>Maria Anders</td>
            <td>UK</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Maria Anders</td>
            <td>Yoshi Tannamuri</td>
            <td>Maria Anders</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Maria Anders</td>
            <td>Yoshi Tannamuri</td>
            <td>Maria Anders</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Maria Anders</td>
            <td>Maria Anders</td>
            <td>Yoshi Tannamuri</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Maria Anders</td>
            <td>Laughing Bacchus Winecellars</td>
            <td>Yoshi Tannamuri</td>
            <td>Maria Anders</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Laughing Bacchus Winecellars</td>
            <td>Maria Anders</td>
            <td>Yoshi Tannamuri</td>
            <td>Maria Anders</td>
            <td>Canada</td>
          </tr>
          <tr>
            <td>Magazzini Alimentari Riuniti</td>
            <td>Maria Anders</td>
            <td>Giovanni Rovelli</td>
            <td>Maria Anders</td>
            <td>Italy</td>
          </tr>
        </table>
      </div>
    );
  }
}