// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Tabs } from 'components';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import Page from 'components/Layout/Page';
import { getIsSupportByModuleName } from 'config';
import { useCurrentLand } from 'hooks/useRouterParams';
import { HarvestLand, HarvestDrill } from './harvestPage';

interface Props {
  data?: unknown;
  className?: string;
  basePath: string;
}

const Harvest: React.FC<Props> = ({ className, basePath }) => {
  const { i18n, t } = useTranslation();
  const landId = useCurrentLand();
  const isSupportFarm = getIsSupportByModuleName(landId, 'FARM');

  const categoryOptions = useMemo(() => {
    const labList = [{ label: t('Land'), value: 'land' }];
    isSupportFarm && labList.push({ label: t('Drill'), value: 'drill' });
    return labList;
  }, [isSupportFarm, t]);

  const { url } = useRouteMatch();

  return (
    <Page className={className}>
      <Tabs className='pb-4' items={categoryOptions} basePath={basePath} url={url} />

      <Switch>
        <Route path={`${basePath}/land`}>
          <HarvestLand />
        </Route>
        {isSupportFarm && (
          <Route path={`${basePath}/drill`}>
            <HarvestDrill />
          </Route>
        )}
      </Switch>
    </Page>
  );
};

export default React.memo<Props>(styled(Harvest)`
  display: flex;
  flex-direction: column;

  .LandMarket--landBox {
    width: 180px;
  }
`);
