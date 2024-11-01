// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { LandConfig } from '@evolutionland/evolution-js';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Button, Flex, Input, Box } from 'components';
import Page from 'components/Layout/Page';
import { useFurnaceGetTreasurePrice, useFurnaceBuyTreasure } from 'hooks/useFurnace';
import { useCurrentLand } from 'hooks/useRouterParams';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { ETHERS_BIG_ZERO } from 'utils/bigNumber';
import { extendLandId } from 'utils';

interface StateProps {
  className?: string;
}

const StyledContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundContent};
  ${tw`rounded-md p-4`}
`;

const Index: React.FC<StateProps> = ({ className }) => {
  const landId = useCurrentLand();
  const { account } = useActiveWeb3React(landId);
  const [goldNumber, setGoldNumber] = useState('');
  const [silverNumber, setSilverNumber] = useState('');
  const { RING } = LandConfig[extendLandId(landId)].tokens;
  const treasurePrice = useFurnaceGetTreasurePrice(landId);

  const { handleFurnaceBuyTreasure, pendingTx } = useFurnaceBuyTreasure(landId);

  const handleGoldNumberInput = useCallback((event) => {
    const input = event.target.value;
    setGoldNumber(input);
  }, []);

  const handleSilverNumberInput = useCallback((event) => {
    const input = event.target.value;
    setSilverNumber(input);
  }, []);

  const handleBuySilverTreasure = useCallback(() => {
    try {
      const cost = EthersBigNumber.from(silverNumber).mul(treasurePrice.priceSilverBox.toString());
      handleFurnaceBuyTreasure(account, ETHERS_BIG_ZERO, EthersBigNumber.from(silverNumber), cost);
    } catch (error) {
      console.info('handleBuySilverTreasure', error);
    }
  }, [account, handleFurnaceBuyTreasure, silverNumber, treasurePrice.priceSilverBox]);

  const handleBuyGoldTreasure = useCallback(() => {
    try {
      const cost = EthersBigNumber.from(goldNumber).mul(treasurePrice.priceGoldBox.toString());
      handleFurnaceBuyTreasure(account, EthersBigNumber.from(goldNumber), ETHERS_BIG_ZERO, cost);
    } catch (error) {
      console.info('handleBuySilverTreasure', error);
    }
  }, [account, handleFurnaceBuyTreasure, goldNumber, treasurePrice.priceGoldBox]);

  return (
    <Page className={className}>
      <StyledContainer>
        <Box px='4'>
          <p>
            Silver Treasure Price: {getFullDisplayBalance(treasurePrice.priceSilverBox, RING.decimals)} {RING.symbol}
          </p>
          <p>
            Gold Treasure Price: {getFullDisplayBalance(treasurePrice.priceGoldBox, RING.decimals)} {RING.symbol}
          </p>
          <Box>
            <Flex alignItems='center'>
              <Input type='number' scale='md' value={silverNumber} onChange={handleSilverNumberInput} autoComplete='off' />
              <Button isLoading={pendingTx} onClick={handleBuySilverTreasure}>
                BUY SILVER TREASURE
              </Button>
            </Flex>
            <Flex alignItems='center'>
              <Input type='number' scale='md' value={goldNumber} onChange={handleGoldNumberInput} autoComplete='off' />
              <Button isLoading={pendingTx} onClick={handleBuyGoldTreasure}>
                BUY GOLD TREASURE
              </Button>
            </Flex>
          </Box>
        </Box>
      </StyledContainer>
    </Page>
  );
};

export default React.memo(Index);
