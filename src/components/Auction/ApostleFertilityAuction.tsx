// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import dayjs from 'dayjs';
import BigNumber from 'bignumber.js';
import { ApostleAuction } from 'hooks/backendApi/types';
import { BareProps } from 'components/types';
import { TimerRenderer } from 'components/CountDown/TimerRender';
import { useApostleCurrentSiringPrice } from 'hooks/useApostle';
import { useCurrentLand } from 'hooks/useRouterParams';
import { getDecimalAmount, getDisplayBalanceWithFixd } from 'utils/formatBalance';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { bundleApi } from 'api';
import { extendLandId } from 'utils';
import { LandConfig } from '@evolutionland/evolution-js';
import { useBidPrice } from 'hooks/useBid';
import { BreedBidApostleModal } from 'pages/Apostle/component';
import { useLocation } from 'react-router-dom';
import { StyledFontAttr } from 'ui/styled';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { useTranslation } from 'react-i18next';
import { getIsSupportByModuleName } from 'config';
import { Button } from '../Button';
import Countdown from '../CountDown';
import { Erc20ApproveButton } from '../ApproveButton';
import { StyledContainer } from './styled';
import { Flex } from '../Box';
import { Text } from '../Text';
import AuctionChart from './AuctionChart';
import { useModal } from '../Modal';

export interface Props extends BareProps {
  data: ApostleAuction;
  tokenId: string;
}

const ApostleFertilityAuction: React.FC<Props> = ({ className, data: { status, start_price = '0', end_price = '0', start_at, duration, current_time, current_price, last_bid_start, history, claim_waiting, seller, seller_name }, tokenId }) => {
  const { t } = useTranslation();
  const landId = useCurrentLand();
  const location = useLocation<Location>();
  const { library, account, chainId } = useActiveWeb3React(landId);
  const { RING } = LandConfig[extendLandId(landId)].tokens;
  const duringHammerDown = useMemo(() => history?.length > 0, [history?.length]);
  const startPrice = getDecimalAmount(new BigNumber(start_price), RING.decimals);
  const endPrice = getDecimalAmount(new BigNumber(end_price), RING.decimals);
  const currentPrice = useApostleCurrentSiringPrice(landId, tokenId);
  const bidPrice = useBidPrice(startPrice.toString(), endPrice.toString(), currentPrice.toString(), duration, 20 * 60);

  // const { handleApostleBreedBid, pendingTx: requestedApostleBidWithToken } = useApostleBreedBid(landId, tokenId, '', EthersBigNumber.from(bidPrice));
  const [onClickBreedApostle] = useModal(<BreedBidApostleModal title={t('Breed Apostle')} landId={landId} initTargetTokenId={tokenId} bidPrice={EthersBigNumber.from(bidPrice)} location={location} />);

  const apostleSiringClockAuctionV3Address = bundleApi[landId].getAddressByName(extendLandId(landId), 'SIRING_CLOCK_AUCTION');

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
        <Text fontSize='22px' bold>
          {getDisplayBalanceWithFixd(new BigNumber(currentPrice), RING.decimals)} {RING.symbol}
        </Text>
        <Text fontSize='22px' bold>
          <Countdown date={endTime.valueOf()} renderer={TimerRenderer} autoStart>
            <div>00:00:00</div>
          </Countdown>
        </Text>
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
        <Erc20ApproveButton skip={getIsSupportByModuleName(landId, 'RING_TOKENFALLBACK')} width='100%' from={account} landId={landId} provider={library} tokenContractAddress={RING.address} spenderAddress={apostleSiringClockAuctionV3Address} amountToUse={bidPrice.toString()}>
          <Button width='100%' scale='sm' onClick={onClickBreedApostle}>
            {t('Breed Apostle')}
          </Button>
        </Erc20ApproveButton>
      </Flex>

      <Flex justifyContent='space-between'>
        <StyledFontAttr>{t('Seller')}</StyledFontAttr>
        <StyledFontAttr>{t('Seller Name')}</StyledFontAttr>
      </Flex>

      <Flex justifyContent='space-between'>
        <Text small>{seller}</Text>
        <Text small>{seller_name}</Text>
      </Flex>
    </StyledContainer>
  );
};

export default styled(ApostleFertilityAuction)`
  .Auction--content {
    ${tw`space-y-4`}
  }
`;
