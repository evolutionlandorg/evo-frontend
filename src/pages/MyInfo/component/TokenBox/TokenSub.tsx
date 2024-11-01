// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Button, Flex, Text, useModal, TokenLink, TokenRegister, SwapLink } from 'components';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { Token } from '@evolutionland/evolution-js';
import { useTokenBalance } from 'hooks/useBalance';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useTranslation } from 'react-i18next';
import { bundleApi } from 'api';
import { getIsSupportByModuleName } from 'config';
import { TransferTokenModal } from '../TransferTokenModal';
import { StyledTokenLink, StyledTokenSub, StyledTokenSymbol } from './styled';

export interface Props extends BareProps {
  token: Token;
  bg?: string;
  landId: SUPPORTED_LANDS_INDEX;
  account: string;
  tokenImages?: string[];
}

const TokenSub: React.FC<Props> = ({ className, token, bg, landId, account, tokenImages }) => {
  const { t } = useTranslation();
  const isSupportTokenRegister = getIsSupportByModuleName(landId, 'WALLETTOKENREGISTER');
  const balance = useTokenBalance(landId, token.address, account);
  const [onClickTransferToken] = useModal(<TransferTokenModal addressChecker={bundleApi[landId].isAddress} title={t(`Transfer Token Token`, { token: token.symbol })} landId={landId} token={token} />);

  return (
    <StyledTokenSub className={className} bg={bg}>
      {tokenImages && tokenImages.length > 0 ? (
        <Flex className='-space-x-4'>
          {tokenImages.map((tokenSymbol) => (
            <img key={tokenSymbol} className='w-9' src={`/images/token/${tokenSymbol?.toLocaleLowerCase()}.svg`} alt={`${tokenSymbol}`} />
          ))}
        </Flex>
      ) : (
        <img className='w-11' src={`/images/token/${token?.symbol?.toLocaleLowerCase()}.svg`} alt={`${token.symbol}`} />
      )}
      <StyledTokenSymbol className='mt-3' bold>
        {token.symbol}
      </StyledTokenSymbol>
      <Text className='mt-2' bold>
        {getFullDisplayBalance(balance, token.decimals, 2)}
      </Text>
      <Flex className='mt-5' alignSelf='stretch'>
        <Button scale='sm' className='flex-1' onClick={onClickTransferToken} disabled={!account}>
          {t('Transfer')}
        </Button>
      </Flex>
      <StyledTokenLink>
        <SwapLink landId={landId} token={token} small />
        {isSupportTokenRegister && <TokenRegister landId={landId} token={token} small />}
        <TokenLink landId={landId} token={token} small />
      </StyledTokenLink>
    </StyledTokenSub>
  );
};

export default TokenSub;
