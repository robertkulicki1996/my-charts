import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { AuthStore } from '../../stores/auth.store';

import Header from './../header/header.view';
import OptionsSidebar from '../../common/components/OptionsSidebar/OptionsSidebar';

import './home.view.scss';

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

  render() {
    return (
      <div className="home-wrapper">
        <Header />
        <div className="home-wrapper__main-content">

        </div>
      </div>
    );
  }
}

export default Home;