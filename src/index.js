import React from 'react';
import ReactDom from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';

import './index.scss';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import en from 'react-intl/locale-data/en';
// import ru from 'react-intl/locale-data/ru';
import translations from './common/translations/en.json';

addLocaleData(en);
// addLocaleData(ru);

ReactDom.render(
  <IntlProvider locale="en" messages={translations}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
);

registerServiceWorker();
