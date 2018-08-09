import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { AuthStore } from '../../stores/auth.store';

import Sidebar from '../sidebar/sidebar.view';
import OptionsSidebar from '../../common/components/OptionsSidebar/OptionsSidebar';

import './home.view.scss';

@injectIntl
@inject('authStore')
@observer
class Home extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  render() {
    return (
      <div className="home-wrapper">
        <Sidebar />
        <OptionsSidebar />
      </div>
    );
  }
}

export default Home;