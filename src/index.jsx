"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from '@shopify/polaris';
import esTranslations from '@shopify/polaris/locales/es.json';
import App from './App';

ReactDOM.render(
  <Router basename="/">
    <AppProvider i18n={esTranslations}>
      <App/>
    </AppProvider>
  </Router>,
  document.getElementById("app")
);