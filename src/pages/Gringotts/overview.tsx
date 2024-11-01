// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useRef } from 'react';
import { PopupWindow, PopupHeader, Flex, Tabs } from 'components';
import { Route, Switch, Link, useLocation, useRouteMatch } from 'react-router-dom';

import Buy from './buy';
import Sell from './sell';
import Liquidity from './liquidity';
import RemoveLiquidity from './removeLiquidity';

interface Props {
  className?: string;
  basePath: string;
}

const Overview: React.FC<Props> = ({ className, basePath }) => {
  const match = useRouteMatch(basePath);

  const tabsRef = useRef([
    { label: 'Buy', value: 'buy-ring' },
    { label: 'Sell', value: 'sell-ring' },
    { label: 'Liquidity', value: 'add-liquidity' },
    { label: 'Remove Liquidity', value: 'remove-liquidity' }
  ]);

  return (
    <PopupWindow className={className}>
      <PopupHeader title='Gringotts' />
      <Flex flex='1' overflow='hidden' flexDirection='column' padding='3'>
        <Tabs basePath={basePath} url={match.url} items={tabsRef.current} />
        <Switch>
          <Route path={`${basePath}/sell-ring`}>
            <Sell />
          </Route>
          <Route path={`${basePath}/add-liquidity`}>
            <Liquidity />
          </Route>
          <Route path={`${basePath}/remove-liquidity`}>
            <RemoveLiquidity />
          </Route>
          <Route path={`${basePath}/buy-ring`}>
            <Buy />
          </Route>
          <Route>
            <Buy />
          </Route>
        </Switch>
      </Flex>
    </PopupWindow>
  );
};

export default Overview;
