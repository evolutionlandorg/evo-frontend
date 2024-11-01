// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import BigNumber from 'bignumber.js';
import { ApostleAuction } from 'hooks/backendApi/types';
import { BareProps } from 'components/types';
import { TimerRenderer } from 'components/CountDown/TimerRender';
import { useApostleBidWithToken, useApostleCurrentPrice } from 'hooks/useApostle';
import { useCurrentLand } from 'hooks/useRouterParams';
import { getDecimalAmount, getDisplayBalanceWithFixd } from 'utils/formatBalance';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { bundleApi } from 'api';
import { extendLandId } from 'utils';
import { LandConfig } from '@evolutionland/evolution-js';
import { useBidPrice } from 'hooks/useBid';
import { StyledFontAttr } from 'ui/styled';
import { useTranslation } from 'react-i18next';
import { getIsSupportByModuleName } from 'config';
import { Button } from '../Button';
import Countdown from '../CountDown';
import { Erc20ApproveButton } from '../ApproveButton';
import { StyledContainer } from './styled';
import { Flex } from '../Box';
import { ScaleH1, Text } from '../Text';
import AuctionChart from './AuctionChart';

export interface Props extends BareProps {
  data: ApostleAuction;
  tokenId: string;
}

//   data:
//   claim_waiting: number;
//   current_price: string;
//   current_time: number;
//   duration: number;
//   end_price: string;
//   history: any[];
//   land_claim_reward: string;
//   last_bid_start: number;
//   last_price: string;
//   seller: string;
//   seller_name: string;
//   start_at: number;
//   start_price: string;
//   status: string;

const Auction: React.FC<Props> = ({ className, data: { start_price = '0', end_price = '0', start_at, duration, last_bid_start, history, claim_waiting, seller, seller_name }, tokenId }) => {
  const landId = useCurrentLand();
  const { t } = useTranslation();
  const { library, account } = useActiveWeb3React(landId);
  const { RING } = LandConfig[extendLandId(landId)].tokens;

  const duringHammerDown = useMemo(() => history?.length > 0, [history?.length]);
  const startPrice = getDecimalAmount(new BigNumber(start_price), RING.decimals);
  const endPrice = getDecimalAmount(new BigNumber(end_price), RING.decimals);
  const currentPrice = useApostleCurrentPrice(landId, tokenId);
  const bidPrice = useBidPrice(duringHammerDown ? currentPrice.toString() : startPrice.toString(), history?.length > 0 ? currentPrice.toString() : endPrice.toString(), currentPrice.toString(), duration, 20 * 60);
  const { handleApostleBidWithToken, pendingTx: requestedApostleBidWithToken } = useApostleBidWithToken(landId, tokenId, '', bidPrice.toString());

  const landClockAuctionV3Address = bundleApi[landId].getAddressByName(extendLandId(landId), 'APOSTLE_CLOCK_AUCTION');

  const endTime = useMemo(() => {
    if (duringHammerDown) {
      return dayjs.unix(last_bid_start).add(claim_waiting, 's');
    }
    return dayjs.unix(start_at).add(duration, 's');
  }, [claim_waiting, duration, duringHammerDown, last_bid_start, start_at]);

  return (
    <StyledContainer className={className}>
      <Flex justifyContent='space-between'>
        <StyledFontAttr>{t('Current Price')}</StyledFontAttr>
        <StyledFontAttr>{t('Time Left')}</StyledFontAttr>
      </Flex>

      <Flex justifyContent='space-between'>
        <ScaleH1>
          {getDisplayBalanceWithFixd(new BigNumber(currentPrice), RING.decimals)} {RING.symbol}
        </ScaleH1>
        <ScaleH1>
          <Countdown date={endTime.valueOf()} renderer={TimerRenderer} autoStart>
            <div>00:00:00</div>
          </Countdown>
        </ScaleH1>
      </Flex>

      {!duringHammerDown ? <AuctionChart points={[startPrice, endPrice]} currentPoint={currentPrice} /> : null}

      {!duringHammerDown ? (
        <Flex justifyContent='space-between'>
          <Text small bold>
            {t('Starting')}: {getDisplayBalanceWithFixd(startPrice, RING.decimals)} {RING.symbol}
          </Text>
          <Text small bold>
            {t('Ending')}: {getDisplayBalanceWithFixd(endPrice, RING.decimals)} {RING.symbol}
          </Text>
        </Flex>
      ) : null}

      <Flex>
        <Erc20ApproveButton skip={getIsSupportByModuleName(landId, 'RING_TOKENFALLBACK')} width='100%' from={account} landId={landId} provider={library} tokenContractAddress={RING.address} spenderAddress={landClockAuctionV3Address} amountToUse={bidPrice.toString()}>
          <Button width='100%' scale='sm' isLoading={requestedApostleBidWithToken} onClick={handleApostleBidWithToken}>
            {t('Bid with Token', { token: RING.symbol })}
          </Button>
        </Erc20ApproveButton>
      </Flex>

      <Flex justifyContent='space-between'>
        <StyledFontAttr>{t('Seller')}</StyledFontAttr>
        <StyledFontAttr>{t('Seller Name')}</StyledFontAttr>
      </Flex>

      <Flex justifyContent='space-between'>
        <Text small>{bundleApi[landId].toDisplayAddress(seller)}</Text>
        <Text small>{seller_name}</Text>
      </Flex>
    </StyledContainer>
  );
};

export default styled(Auction)``;
