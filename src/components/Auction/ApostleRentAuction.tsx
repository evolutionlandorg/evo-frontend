// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { ApostleAuction } from 'hooks/backendApi/types';
import { BareProps } from 'components/types';
import { useApostleHireBid } from 'hooks/useApostle';
import { useCurrentLand } from 'hooks/useRouterParams';
import { getDisplayBalanceWithFixd } from 'utils/formatBalance';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { bundleApi } from 'api';
import { extendLandId } from 'utils';
import { LandConfig } from '@evolutionland/evolution-js';
import { useBidPrice } from 'hooks/useBid';
import { StyledFontAttr } from 'ui/styled';
import { useTranslation } from 'react-i18next';
import { parseUnits } from 'ethers/lib/utils';
import { BigNumberToEthers, ethersToBigNumber } from 'utils/bigNumber';
import { getIsSupportByModuleName } from 'config';
import { Button } from '../Button';
import { Erc20ApproveButton } from '../ApproveButton';
import { StyledContainer } from './styled';
import { Flex } from '../Box';
import { Text } from '../Text';
import AuctionChart from './AuctionChart';

export interface Props extends BareProps {
  data: ApostleAuction;
  tokenId: string;
}

const Auction: React.FC<Props> = ({ className, data: { status, start_price = '0', end_price = '0', start_at, duration, current_time, current_price, last_bid_start, history, claim_waiting, seller, seller_name }, tokenId }) => {
  const landId = useCurrentLand();
  const { t } = useTranslation();
  const { library, account } = useActiveWeb3React(landId);
  const { RING } = LandConfig[extendLandId(landId)].tokens;

  const duringHammerDown = useMemo(() => history?.length > 0, [history?.length]);

  const currentPrice = ethersToBigNumber(parseUnits(current_price, RING.decimals));
  const startPrice = currentPrice;
  const endPrice = currentPrice;

  const bidPrice = useBidPrice(duringHammerDown ? currentPrice.toString() : startPrice.toString(), history?.length > 0 ? currentPrice.toString() : endPrice.toString(), currentPrice.toString(), duration, 20 * 60);
  const { handleApostleHireBid, pendingTx: requestedApostleHireBid } = useApostleHireBid(landId);

  const tokenUseAddress = bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_USE');

  // const endTime = useMemo(() => {
  //   if (duringHammerDown) {
  //     return dayjs.unix(last_bid_start).add(claim_waiting, 's');
  //   }
  //   return dayjs.unix(start_at).add(duration, 's');
  // }, [claim_waiting, duration, duringHammerDown, last_bid_start, start_at]);

  const onClickRecruit = useCallback(() => {
    handleApostleHireBid(tokenId, BigNumberToEthers(currentPrice));
  }, [currentPrice, handleApostleHireBid, tokenId]);

  return (
    <StyledContainer className={className}>
      <Flex justifyContent='flex-start'>
        <StyledFontAttr>{t('Current Price')}</StyledFontAttr>
        {/* <StyledFontAttr>{t('Time Left')}</StyledFontAttr> */}
      </Flex>

      <Flex justifyContent='flex-start'>
        <Text fontSize='22px' bold>
          {getDisplayBalanceWithFixd(new BigNumber(currentPrice), RING.decimals)} {RING.symbol}
        </Text>
        {/* <Text fontSize='22px' bold>
          <Countdown date={endTime.valueOf()} renderer={TimerRenderer} autoStart>
            <div>00:00:00</div>
          </Countdown>
        </Text> */}
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
        <Erc20ApproveButton skip={getIsSupportByModuleName(landId, 'RING_TOKENFALLBACK')} width='100%' from={account} landId={landId} provider={library} tokenContractAddress={RING.address} spenderAddress={tokenUseAddress} amountToUse={bidPrice.toString()}>
          <Button width='100%' scale='sm' isLoading={requestedApostleHireBid} onClick={onClickRecruit}>
            {t('Recruit')}
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

export default styled(Auction)``;
