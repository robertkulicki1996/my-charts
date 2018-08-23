import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { AuthStore } from '../../stores/auth.store';
import Switch from '../../common/components/Switch/Switch';

import Header from './../header/header.view';

import './home.view.scss';

function onChange(value) {
  console.log(`switch checked: ${value}`); // eslint-disable-line
}


@injectIntl
@inject('authStore')
@observer
class Home extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  state = {
    disabled: false,
  }

  state = {
    disabled: false,
  }

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    return (
      <div className="home-wrapper">
        <Header />
        <div className="home-wrapper__main-content">
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
            <Switch
              onChange={onChange}
              disabled={this.state.disabled}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;