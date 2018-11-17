import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { AuthStore } from '../../stores/auth';
import NavBar from '../NavBar/NavBar.view';

// components
import AvatarWithName from '../../common/components/AvatarWithName/AvatarWithName';

import './Dashboard.view.scss';
import translations from './Dashboard.view.intl';

@withRouter
@injectIntl
@inject('authStore')
@observer
class Dashboard extends Component {
  static propTypes = {
    authStore: PropTypes.instanceOf(AuthStore).isRequired
  }

  render() {
    const { intl, authStore } = this.props;
    const { authUser } = authStore;
    return (
      <div className="dashboard-wrapper">
        <NavBar />
        <div className="user-info-section">
          <AvatarWithName avatarUrl={authUser.photoURL} name={!!authUser.displayName ? authUser.displayName : authUser.email} email={authUser.email} />
        </div>
        <div className="user-charts">
          <div className="user-charts__title">{intl.formatMessage(translations.title)}</div>
          <div className="user-charts">
            <span className="temp2">My saved charts objects</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;