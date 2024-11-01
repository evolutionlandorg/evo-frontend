// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Page from 'components/Layout/Page';
import { useCurrentLand } from 'hooks/useRouterParams';
import { env } from 'config';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Tabs, EmptyView } from 'components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { LPItem } from './component';

interface StateProps {
  basePath: string;
  className?: string;
}

const Index: React.FC<StateProps> = ({ className, basePath }) => {
  const landId = useCurrentLand();
  const { account } = useActiveWeb3React(landId);
  const stakes = env[landId]?.FARM_TOKENS || [];
  const stakes_deprecated = env[landId]?.FARM_TOKENS_DEPRECATED || [];
  const match = useRouteMatch(basePath);
  const tabsRef = [
    { label: 'Active', value: 'active' },
    { label: 'Finished', value: 'finished' }
  ];

  return (
    <Page className={className}>
      <Tabs className='mb-4' basePath={basePath} url={match.url} items={tabsRef} />
      <Switch>
        <Route path={`${basePath}/active`}>
          {stakes.map((item) => (
            <LPItem key={item.staker || item.stakerToken?.address} landId={landId} {...item} account={account} />
          ))}
        </Route>
        <Route path={`${basePath}/finished`}>
          {!stakes_deprecated || !stakes_deprecated.length ? <EmptyView className='mt-16' /> : null}
          {stakes_deprecated.map((item) => (
            <LPItem disableStake key={item.staker || item.stakerToken?.address} landId={landId} {...item} account={account} />
          ))}
        </Route>
      </Switch>
    </Page>
  );
};

export default Index;
