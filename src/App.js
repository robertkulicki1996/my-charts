import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { IntlProvider, addLocaleData } from 'react-intl';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import stores from './stores';

import ApplicationRoutes from './common/consts/routes';

import translations from './common/translations/en.json';
import en from 'react-intl/locale-data/en';

addLocaleData(en);

class App extends Component {
  render() {
    return (
      <IntlProvider locale="en" messages={translations}>
        <Provider {...stores} >
          <React.Fragment>
            <ApplicationRoutes />
            <ToastContainer />
          </React.Fragment>
        </Provider>
      </IntlProvider>
    );
  }
}

export default App;