// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { breakpoints } from 'config/breakpoints';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { SUPPORTED_LANDS_FOR_ROUTER } from 'config/continents';
import useEagerConnect from 'hooks/useEagerConnect';
import { getIsSupportByModuleName, getSupportLandByModuleName } from 'config';
import { Api } from 'api';
import TransactionUpdater from 'store/transactions/updater';
import { useCurrentLand } from 'hooks/useRouterParams';
import { usePollBlockNumber } from 'store/block/hooks';
import { useTranslation } from 'react-i18next';
import { useIllustratedList } from 'store/illustrated/hooks';
import { useModal, useModal2 } from 'components';
import { useUserAcceptAlphaAgreement, useAcceptCrabXRING2XWRING } from 'store/user/hooks';
import { GovDetails } from 'pages/Governance/Details';
import backgroundImg from './img/bg.png';
import LandMarket from '../Land/market';
import LandDetail from '../Land/detail';
import MyLand from '../Land/myLand';
import LandEdit from '../Land/editDetail';
import ApostleEdit from '../Apostle/editDetail';
import ApostleMarket from '../Apostle/market';
import ApostleDetail from '../Apostle/detail';
import MyApostle from '../Apostle/myApostle';
import { Lottery } from '../Events';
import DevToastPage from '../Dev/toast';
import MyDrill from '../Drill/my';
import DrillDetail from '../Drill/detail';
import DrillEdit from '../Drill/editDetail';
import DrillIllustrated from '../Drill/illustrated';
import Furnace from '../Furnace/overview';
import DevEvolutionjsPage from '../Dev/evolutionjs';
import Gringotts from '../Gringotts/overview';
import Farm from '../Farm';
import TileMap from '../Map';
import { Tokens as MyToken, Harvest } from '../MyInfo';
import { Menu, SubMenu, getGameSubMenuConfig, getEventsSubMenuConfig, getMarketPlaceSubMenuConfig, getDashboardSubMenuConfig, getFarmSubMenuConfig, AlphaAgreementModal, getGovSubMenuConfig, CrabXRING2XWRINGModal } from './component';

interface Props {
  data?: unknown;
  className?: string;
  basePath: string;
}

export const ContextBox = styled.div`
  height: calc(100vh - 92px);
`;

const Land: React.FC<Props> = (props) => {
  const landId = useCurrentLand();
  const { t } = useTranslation();
  const supportXRING2XWRING = getIsSupportByModuleName(landId, 'XRING_TO_XWRING');

  const [onPresentAlphaAgreementModal] = useModal2(<AlphaAgreementModal title={t('Agreement')} />, false, false, 'AlphaAgreementModal');
  const [onPresentCrabXRING2XWRINGModal] = useModal(<CrabXRING2XWRINGModal title={t('Agreement')} />, true, false, 'CrabXRING2XWRINGModal');
  const [isAcceptAlphaAgreement] = useUserAcceptAlphaAgreement();
  const [isAcceptCrabXRING2XWRING] = useAcceptCrabXRING2XWRING();

  useEagerConnect(landId);
  usePollBlockNumber(landId);

  const [, fetchIllustratedList] = useIllustratedList();
  useEffect(() => {
    if (!isAcceptCrabXRING2XWRING && supportXRING2XWRING) {
      onPresentCrabXRING2XWRINGModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAcceptCrabXRING2XWRING]);

  useEffect(() => {
    if (!isAcceptAlphaAgreement) {
      onPresentAlphaAgreementModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAcceptAlphaAgreement]);

  useEffect(() => {
    fetchIllustratedList(landId);
  }, [fetchIllustratedList, landId]);

  const gameSubMenuConfig = getGameSubMenuConfig(landId);
  const eventsSubMenuConfig = getEventsSubMenuConfig(landId);
  const marketPlaceSubMenuConfig = getMarketPlaceSubMenuConfig(landId);
  const dashboardSubMenuConfig = getDashboardSubMenuConfig(landId);
  const farmSubMenuConfig = getFarmSubMenuConfig(landId);
  const govSubMenuConfig = getGovSubMenuConfig(landId);

  const farmRoutes = getSupportLandByModuleName('FARM').join('|');
  const apostleArenaRoutes = getSupportLandByModuleName('APOSTLE_ARENA').join('|');

  return (
    <div className={props.className}>
      <Api>
        <TransactionUpdater />
        <Switch>
          <Route exact path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})`}>
            <Menu activeKey='marketplace' t={t} />
            <SubMenu config={marketPlaceSubMenuConfig} activeKey='marketplace-land' t={t} />
            <LandMarket />
          </Route>
          {/* ================ APOSTLE ================ */}
          <Route exact path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/apostle/:tokenId`}>
            <Menu activeKey='marketplace' t={t} />
            <SubMenu config={marketPlaceSubMenuConfig} activeKey='marketplace-apostle' t={t} />
            <ApostleDetail />
          </Route>
          <Route exact path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/apostle/:tokenId/edit`}>
            <Menu activeKey='dashboard' t={t} />
            <SubMenu config={dashboardSubMenuConfig} activeKey='dashboard-apostle' t={t} />
            <ApostleEdit />
          </Route>

          {/* ================ LAND ================ */}
          <Route exact path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/land/:tokenId`}>
            <Menu activeKey='marketplace' t={t} />
            <SubMenu config={marketPlaceSubMenuConfig} activeKey='marketplace-land' t={t} />
            <LandDetail />
          </Route>
          <Route exact path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/land/:tokenId/edit`}>
            <Menu activeKey='dashboard' t={t} />
            <SubMenu config={dashboardSubMenuConfig} activeKey='dashboard-land' t={t} />
            <LandEdit />
          </Route>

          {/* ================ DRILL ================ */}
          <Route exact path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/drill/:tokenId`}>
            <Menu activeKey='marketplace' t={t} />
            <SubMenu config={marketPlaceSubMenuConfig} activeKey='marketplace-drill' t={t} />
            <DrillDetail />
          </Route>
          <Route exact path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/drill/:tokenId/edit`}>
            <Menu activeKey='dashboard' t={t} />
            <SubMenu config={dashboardSubMenuConfig} activeKey='dashboard-drill' t={t} />
            <DrillEdit />
          </Route>

          {/* ================ MARKET ================ */}
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/market/land`}>
            <Menu activeKey='marketplace' t={t} />
            <SubMenu config={marketPlaceSubMenuConfig} activeKey='marketplace-land' t={t} />
            <LandMarket />
          </Route>
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/market/apostle`}>
            <Menu activeKey='marketplace' t={t} />
            <SubMenu config={marketPlaceSubMenuConfig} activeKey='marketplace-apostle' t={t} />
            <ApostleMarket />
          </Route>

          {/* ============ Governance ============ */}
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/gov`}>
            <Menu activeKey='gov' t={t} />
            <SubMenu config={govSubMenuConfig} activeKey='gov-details' t={t} />
            <GovDetails />
          </Route>

          {/* ================ MY ================ */}
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/my/land`}>
            <Menu activeKey='dashboard' t={t} />
            <SubMenu config={dashboardSubMenuConfig} activeKey='dashboard-land' t={t} />
            <MyLand />
          </Route>
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/my/apostle`}>
            <Menu activeKey='dashboard' t={t} />
            <SubMenu config={dashboardSubMenuConfig} activeKey='dashboard-apostle' t={t} />
            <MyApostle />
          </Route>
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/my/drill`}>
            <Menu activeKey='dashboard' t={t} />
            <SubMenu config={dashboardSubMenuConfig} activeKey='dashboard-drill' t={t} />
            <MyDrill />
          </Route>
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/my/token`}>
            <Menu activeKey='dashboard' t={t} />
            <SubMenu config={dashboardSubMenuConfig} activeKey='dashboard-token' t={t} />
            <MyToken basePath={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/my/token`} />
          </Route>
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/my/harvest`}>
            <Menu activeKey='dashboard' t={t} />
            <SubMenu config={dashboardSubMenuConfig} activeKey='dashboard-harvest' t={t} />
            <Harvest basePath={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/my/harvest`} />
          </Route>

          {/* ================ FURNACE ================ */}
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/events/lottery`}>
            <Menu activeKey='events' t={t} />
            <SubMenu config={eventsSubMenuConfig} activeKey='events-lottery' t={t} />
            <Lottery />
          </Route>
          {/* <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/events/furnace-treasure`}>
            <Menu />
            <SubMenu config={eventsSubMenuConfig} />
            <FurnaceTreasure />
          </Route> */}
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/furnace`}>
            <Menu activeKey='game' t={t} />
            <SubMenu config={gameSubMenuConfig} activeKey='game-furnace' t={t} />
            <Furnace basePath={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/furnace`} />
          </Route>

          <Route path={`/land/:landId(${farmRoutes})/farm`}>
            <Menu activeKey='farm' t={t} />
            <SubMenu config={farmSubMenuConfig} activeKey='farm-stake' t={t} />
            <Farm basePath={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/farm`} />
          </Route>

          {/* ================ MAP ================ */}
          <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/map`}>
            <Menu activeKey='game' t={t} />
            <SubMenu config={gameSubMenuConfig} activeKey='game-map' t={t} />
            <TileMap />
          </Route>

          {/* ================ DEV ================ */}
          {process.env.REACT_APP_CHAIN === 'testnet' && (
            <>
              <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/dev/toast`}>
                <Menu t={t} />
                <DevToastPage />
              </Route>
              <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/dev/evolutionjs`}>
                <Menu t={t} />
                <DevEvolutionjsPage />
              </Route>
              <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/illustrated`}>
                <Menu t={t} />
                <DrillIllustrated />
              </Route>
              <Route path={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/bank`}>
                <Menu t={t} />
                <Gringotts basePath={`/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})/bank`} />
              </Route>
            </>
          )}
        </Switch>
      </Api>
    </div>
  );
};

export default React.memo<Props>(styled(Land)`
  height: 100vh;
  overflow: auto;

  @media screen and (min-width: ${breakpoints.tablet}) {
    /* background-image: url(${backgroundImg}); */
  }
`);
