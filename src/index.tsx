// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import './index.scss';
import 'config/i18n';

import ErrorBoundary from 'components/ErrorBoundary';
// Redux
// import store from 'store';
import { Spin } from 'antd';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Provider from './Providers';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <ErrorBoundary>
        <Suspense
          fallback={
            <Spin size='large'>
              <div />
            </Spin>
          }
        >
          <App />
        </Suspense>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
