// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import './App.less';

import BigNumber from 'bignumber.js';
import routes from 'config/routers';
import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GlobalStyle from 'ui/Global';
import useUserAgent from 'hooks/useUserAgent';
import { ToastListener } from './contexts/ToastsContext';

const NotFound = lazy(() => import('pages/NotFound'));

// This config is required for number formatting
// https://mikemcl.github.io/bignumber.js/#toS
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
  ROUNDING_MODE: 1
});

function App() {
  useUserAgent();

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        {routes.map((route, index) => {
          const Component = React.lazy(() => import(`./pages/${route.component}`)); // pages 和 index.tsx 给到 webpack 一些粗略信息以便使用 import
          return (
            <Route exact={route.exact} key={index} path={route.path}>
              <Component name='EvolutionLand' />
            </Route>
          );
        })}
        <Route component={NotFound} />
      </Switch>
      <ToastListener />
    </Router>
  );
}

export default React.memo(App);
