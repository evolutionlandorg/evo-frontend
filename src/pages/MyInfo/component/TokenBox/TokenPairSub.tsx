// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Button, Flex, Text, TokenLink, TokenRegister, useModal, Box } from 'components';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useTokenBalance } from 'hooks/useBalance';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useBankUniswapGetDerivedPairInfo } from 'hooks/useBank';
import { Token } from '@evolutionland/evolution-js';
import { useTranslation } from 'react-i18next';
import { bundleApi } from 'api';
import { getIsSupportByModuleName } from 'config';
import { TransferTokenModal } from '../TransferTokenModal';
import { StyledTokenLink, StyledTokenSub, StyledTokenSymbol } from './styled';

export interface Props extends BareProps {
  token0: Token;
  token1: Token;
  bg?: string;
  landId: SUPPORTED_LANDS_INDEX;
  account: string;
  tokenImages?: string[];
  transferButton?: boolean;
  externalButton?: React.ReactNode;
}

const TokenPairSub: React.FC<Props> = ({ className, token0, token1, bg, landId, account, transferButton, externalButton }) => {
  const { t } = useTranslation();
  const isSupportTokenRegister = getIsSupportByModuleName(landId, 'WALLETTOKENREGISTER');

  const pair = useBankUniswapGetDerivedPairInfo(landId, token0, token1);
  const balance = useTokenBalance(landId, pair?.liquidityToken.address, account);
  const [onClickTransferToken] = useModal(<TransferTokenModal addressChecker={bundleApi[landId].isAddress} title={t(`Transfer Token Token`, { token: `${pair?.token0.symbol}-${pair?.token1.symbol} LP` })} landId={landId} token={pair?.liquidityToken} />);

  return (
    <StyledTokenSub className={className} bg={bg}>
      <Flex className='-space-x-4'>
        <img className='w-11' src={`/images/token/${token0?.symbol?.toLocaleLowerCase()}.svg`} alt={`${token0?.symbol}`} />
        <img className='w-11' src={`/images/token/${token1?.symbol?.toLocaleLowerCase()}.svg`} alt={`${token1?.symbol}`} />
      </Flex>
      <StyledTokenSymbol className='mt-3' bold>
        {token0?.symbol}-{token1?.symbol}
      </StyledTokenSymbol>
      <Text className='mt-2' bold>
        {getFullDisplayBalance(balance, pair?.liquidityToken.decimals, 2)}
      </Text>
      <Box className='mt-5' width='100%'>
        {transferButton ? (
          <Button width='100%' scale='sm' className='flex-1' onClick={onClickTransferToken} disabled={!account}>
            {t('Transfer')}
          </Button>
        ) : null}
        {externalButton}
      </Box>
      <StyledTokenLink>
        {isSupportTokenRegister && <TokenRegister landId={landId} token={pair?.liquidityToken} small />}
        <TokenLink landId={landId} token={pair?.liquidityToken} small />
      </StyledTokenLink>
    </StyledTokenSub>
  );
};

export default TokenPairSub;
