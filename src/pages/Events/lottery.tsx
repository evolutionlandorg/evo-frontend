// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import tw from 'twin.macro';
import Page from 'components/Layout/Page';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Button, LinkExternal } from 'components';
import { useLotteryGetUserPoints, useLotteryPlayWithTicket, useLotteryGetTotalRewardInPool } from 'hooks/useLottery';
import { useCurrentLand } from 'hooks/useRouterParams';
import { getDecimalAmount, getFullDisplayBalance } from 'utils/formatBalance';
import { LandConfig } from '@evolutionland/evolution-js';
import { extendLandId } from 'utils';
import { useTranslation } from 'react-i18next';
import ConnectWalletButton from 'components/ConnectWalletButton';
import BigNumber from 'bignumber.js';
import { BIG_TEN } from 'utils/bigNumber';

interface StateProps {
  className?: string;
}

const StyledContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.backgroundContent};
  ${tw`rounded-lg p-4`}
`;

const StyledTitle = styled.p`
  text-shadow: 0 4px 0 rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.textTitle};
  ${tw` text-xl font-bold mb-2`}
`;

const StyledValue = styled.p`
  text-shadow: 0 8px 0 rgba(0, 0, 0, 0.3);
  ${tw`text-4xl font-bold`}
`;

const StyledButton = styled(Button)`
  ${tw` font-bold`}
`;

const Index: React.FC<StateProps> = ({ className }) => {
  const { t } = useTranslation('events');
  const landId = useCurrentLand();
  const { account } = useActiveWeb3React(landId);
  const pointsBalance = useLotteryGetUserPoints(landId, account);
  const totalRewardInPool = useLotteryGetTotalRewardInPool(landId);
  const { RING } = LandConfig[extendLandId(landId)].tokens;

  const { handleLotteryPlayWithTicket, pendingTx } = useLotteryPlayWithTicket(landId);
  return (
    <Page className={className}>
      <StyledContainer>
        <Row>
          <Col md={24} lg={12}>
            <img className='rounded-xl' src='/images/events/lottery/landing.jpg' alt='lottery landing page' />
          </Col>
          <Col md={24} lg={12} className='md:pt-5 lg:pl-8'>
            <StyledTitle>{t('Jackpot')}:</StyledTitle>
            <StyledValue className='mb-8'>
              {getFullDisplayBalance(totalRewardInPool, RING.decimals, 2)} {RING.symbol}
            </StyledValue>
            <StyledTitle>{t('Your Points')}:</StyledTitle>
            <StyledValue className='mb-8'>{getFullDisplayBalance(pointsBalance, RING.decimals, 2)}</StyledValue>

            {account ? (
              <>
                <StyledButton
                  className='w-full mb-5'
                  isLoading={pendingTx}
                  disabled={pointsBalance.lt(getDecimalAmount(BIG_TEN, RING.decimals))}
                  onClick={() => {
                    handleLotteryPlayWithTicket('s');
                  }}
                >
                  {t('Win up to 100,000 Token with 10 points', { token: RING.symbol })}
                </StyledButton>
                <StyledButton
                  className='w-full'
                  isLoading={pendingTx}
                  disabled={pointsBalance.lt(getDecimalAmount(new BigNumber(10), RING.decimals))}
                  onClick={() => {
                    handleLotteryPlayWithTicket('l');
                  }}
                >
                  {t('Win up to 1,000,000 Token with 100 points', { token: RING.symbol })}
                </StyledButton>
              </>
            ) : (
              <ConnectWalletButton className='w-full mb-5' landId={landId} />
            )}

            <LinkExternal className='mt-2' href='https://docs.evolution.land/getting-started/game-entities/lottery'>
              Every penny you spend has a chance to win big.
            </LinkExternal>
          </Col>
        </Row>
      </StyledContainer>
    </Page>
  );
};

export default React.memo(Index);
