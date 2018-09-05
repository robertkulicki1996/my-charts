import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Switch from '../../common/components/Switch/Switch';
import InputNumber from '../../common/components/InputNumber/InputNumber';

import './Sidebar.view.scss';

function onChange(value) {
  console.log(`switch checked: ${value}`);
}

@observer
export default class Sidebar extends Component {

  state = {
    disabled: false,
    r: 'a'
  }

  render() {
    return (
      <div className="options-sidebar">
        <div style={{ margin: 20 }}>
          <Switch
            onChange={onChange}
            disabled={this.state.disabled}
          />
        </div>
        <div style={{ margin: 20 }}>
          <Switch
            onChange={onChange}
            disabled={this.state.disabled}
          />
        </div>
        <div style={{ margin: 20 }}>
          <Switch
            onChange={onChange}
            disabled={this.state.disabled}
          />
        </div>
        <div style={{ margin: 20 }}>
          <Switch
            onChange={onChange}
            disabled={this.state.disabled}
          />
        </div>
        <div style={{ margin: 20 }}>
          <InputNumber
            style={{ width: 120 }}
            defaultValue={10}
            onChange={onChange}
            precision={2}
          />
        </div>
        <div style={{ margin: 20 }}>
          <InputNumber
            style={{ width: 120 }}
            defaultValue={10}
            onChange={onChange}
            precision={2}
          />
        </div>
      </div>
    );
  }
}