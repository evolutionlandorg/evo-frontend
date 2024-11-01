// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BareProps } from 'components/types';
import { Flex, Collapse, Button, Erc20ApproveButton, NumericalInput } from 'components';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { StyledFontAttr, StyledFontNormal } from 'ui/styled';
import { useFarmGetStakerTotalSupply, useFarmGetStakerBalanceOf, useFarmGetStakerAddress, useFarmGetStakerEarned, useFarmStakeToken, useFarmStakerWithdraw, useFarmStakerClaim } from 'hooks/useFarm';
import { getDisplayBalanceWithFixd, getDecimalAmount } from 'utils/formatBalance';
import { useTokenBalance } from 'hooks/useBalance';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useGetFarmAPR } from 'hooks/backendApi';

import BigNumber from 'bignumber.js';
import { useTranslation } from 'react-i18next';
import { FarmStaker } from 'config/types';
import useMatchBreakpoints from 'hooks/useMatchBreakpoints';
import GetLPTooltip from '../GetLPTooltip';

export interface Props extends BareProps, FarmStaker {
  account: string;
  landId: SUPPORTED_LANDS_INDEX;
  disableStake?: boolean;
}

export interface ValuesProps extends BareProps {
  title: string;
  value: string;
}

const StyledLPItem = styled.div`
  align-items: center;
`;

const StyledLPItemTokenBox = styled(Flex)`

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-basis: 200px;
  }
`;

const StyledLPItemBodyBox = styled(Flex)`
  background: rgba(57, 71, 103, 0.2);
  border-radius: 15px;
  flex-direction: column;
  padding: 10px;
  ${tw`space-y-3`}
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 18px;
  }
`;

const StyledBalanceWithLink = styled.span`
  color: ${({ theme }) => theme.colors.textActive};
  ${tw`underline cursor-pointer`}
`;

const StyledBalance = styled.span`
  color: ${({ theme }) => theme.colors.textActive};
`;

const StyledTokenIconBox = styled(Flex)`
  ${tw`-space-x-2`}
  ${({ theme }) => theme.mediaQueries.sm} {
    ${tw`-space-x-4`}
  }
`;

const StyledTokenIcon = styled.img`
  ${tw`w-4`}
  ${({ theme }) => theme.mediaQueries.sm} {
    ${tw`w-8`}
  }
`;

const StyledTokenSymbol = styled.p`
  ${tw`ml-2 text-xs`}
  ${({ theme }) => theme.mediaQueries.sm} {
    ${tw`ml-5 text-base font-bold`}
  }
`;

const StyledCollapseBodyBox = styled(Flex)`
  flex-direction: column;
  ${tw`p-2 space-y-3`}
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    ${tw`p-3 space-x-3 space-y-0`}
  }
`;

const Values: React.FC<ValuesProps> = ({ title, value }) => (
  <Flex className='mx-2 text-center' flex={1} flexDirection='column'>
    <StyledFontAttr>{title}</StyledFontAttr>
    <p>{value}</p>
  </Flex>
);

const LPItem: React.FC<Props> = ({ className, account, landId, token0, token1, stakerToken, targetToken, lpExternalUrl, staker, disableStake }) => {
  const { t } = useTranslation(['farm', 'common']);
  const { isDesktop } = useMatchBreakpoints();

  const { library } = useActiveWeb3React(landId);

  const [stakeValue, setStakeValue] = useState<string>('');
  const [unstakeValue, setUnstakeValue] = useState<string>('');

  const stakerTokenToStaker = useFarmGetStakerAddress(landId, stakerToken.address);
  const stakerAddress = staker || stakerTokenToStaker;
  const totalSupply = useFarmGetStakerTotalSupply(landId, stakerAddress);
  const stakering = useFarmGetStakerBalanceOf(landId, stakerAddress, account);
  const earned = useFarmGetStakerEarned(landId, stakerAddress, account);
  const balance = useTokenBalance(landId, stakerToken.address, account);

  const { handleFarmStakeToken, pendingTx: farmStakeTokenPendingTx } = useFarmStakeToken(landId);
  const { handleFarmStakerWithdraw, pendingTx: farmStakerWithdrawPendingTx } = useFarmStakerWithdraw(landId);
  const { handleFarmStakerClaim, pendingTx: farmStakerClaimPendingTx } = useFarmStakerClaim(landId);

  const { data: apr, isLoading: farmAPRIsLoading } = useGetFarmAPR({ landId, address: stakerAddress });

  const stakeDecimalsValue = getDecimalAmount(new BigNumber(stakeValue || '0'), stakerToken.decimals);
  const unstakeDecimalsValue = getDecimalAmount(new BigNumber(unstakeValue || '0'), stakerToken.decimals);

  return (
    <StyledLPItem className={className}>
      <Collapse
        header={
          <Flex pl='1rem'>
            <StyledLPItemTokenBox className='flex flex-shrink-0' alignItems='center'>
              <StyledTokenIconBox>
                <StyledTokenIcon src={`/images/token/${token0?.symbol?.toLocaleLowerCase()}.svg`} alt={`${token0?.symbol}`} />
                <StyledTokenIcon src={`/images/token/${token1?.symbol?.toLocaleLowerCase()}.svg`} alt={`${token1?.symbol}`} />
              </StyledTokenIconBox>
              <StyledTokenSymbol>
                {token0?.symbol}-{token1?.symbol}
              </StyledTokenSymbol>
            </StyledLPItemTokenBox>

            <Flex flex='1' className='mx-2'>
              <Values title={t('farm:Total LP')} value={getDisplayBalanceWithFixd(totalSupply, stakerToken.decimals, 6)} />
              {isDesktop && <Values title={t('farm:APY')} value={farmAPRIsLoading || !apr?.apr ? '--' : `${apr?.apr} ${apr?.symbol}`} />}
              {isDesktop && <Values title={t('farm:My Staking')} value={getDisplayBalanceWithFixd(stakering, stakerToken.decimals, 6)} />}
              <Values title={t('farm:Unclaimed')} value={getDisplayBalanceWithFixd(earned, targetToken.decimals, 6)} />
            </Flex>
          </Flex>
        }
      >
        <StyledCollapseBodyBox>
          <StyledLPItemBodyBox flex={1}>
            <Flex justifyContent='space-between'>
              <GetLPTooltip url={lpExternalUrl}>{t('farm:Stake')}</GetLPTooltip>

              <StyledFontNormal>
                {isDesktop && `${token0?.symbol}-${token1?.symbol}`} {t('common:Balance')}: <StyledBalanceWithLink onClick={() => setStakeValue(getDisplayBalanceWithFixd(balance, stakerToken.decimals, stakerToken.decimals))}>{getDisplayBalanceWithFixd(balance, stakerToken.decimals, 6)}</StyledBalanceWithLink>
              </StyledFontNormal>
            </Flex>

            <NumericalInput
              className='w-full'
              value={stakeValue}
              onUserInput={(data) => {
                setStakeValue(data);
              }}
            />

            <Erc20ApproveButton disabled={disableStake} scale='sm' from={account} landId={landId} provider={library} tokenContractAddress={stakerToken.address} spenderAddress={stakerAddress} amountToUse={stakeDecimalsValue.toString()}>
              <Button
                scale='sm'
                disabled={disableStake || stakeDecimalsValue.eq(0) || stakeDecimalsValue.gt(balance)}
                isLoading={farmStakeTokenPendingTx}
                onClick={() => {
                  handleFarmStakeToken(stakerAddress, stakeDecimalsValue.toString());
                }}
              >
                {t('farm:Stake')}
              </Button>
            </Erc20ApproveButton>
          </StyledLPItemBodyBox>

          <StyledLPItemBodyBox flex={1}>
            <Flex justifyContent='space-between'>
              <StyledFontNormal>{t('farm:Unstake')}</StyledFontNormal>
              <StyledFontNormal>
                {t('common:Balance')}:
                <StyledBalanceWithLink
                  onClick={() => {
                    setUnstakeValue(getDisplayBalanceWithFixd(stakering, stakerToken.decimals, stakerToken.decimals));
                  }}
                >
                  {getDisplayBalanceWithFixd(stakering, stakerToken.decimals, 6)}
                </StyledBalanceWithLink>
              </StyledFontNormal>
            </Flex>
            <NumericalInput
              className='w-full'
              value={unstakeValue}
              onUserInput={(data) => {
                setUnstakeValue(data);
              }}
            />
            <Button
              scale='sm'
              disabled={unstakeDecimalsValue.eq(0) || unstakeDecimalsValue.gt(stakering)}
              isLoading={farmStakerWithdrawPendingTx}
              onClick={() => {
                handleFarmStakerWithdraw(stakerAddress, unstakeDecimalsValue.toString());
              }}
            >
              {t('farm:Unstake')}
            </Button>
          </StyledLPItemBodyBox>

          <StyledLPItemBodyBox>
            <StyledFontNormal className='text-center'>{t('farm:Unclaimed')}</StyledFontNormal>
            <StyledBalance>
              {getDisplayBalanceWithFixd(earned, targetToken.decimals, 6)} {targetToken.symbol}
            </StyledBalance>
            <Button
              scale='sm'
              disabled={earned.eq(0)}
              isLoading={farmStakerClaimPendingTx}
              onClick={() => {
                handleFarmStakerClaim(stakerAddress);
              }}
            >
              {t('farm:Harvest')}
            </Button>
          </StyledLPItemBodyBox>
        </StyledCollapseBodyBox>
      </Collapse>
    </StyledLPItem>
  );
};

export default LPItem;
