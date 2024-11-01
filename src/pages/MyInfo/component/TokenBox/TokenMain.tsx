// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Button, Flex, Text, useModal, TokenLink, TokenRegister, SwapLink, ScaleH1, OpenNewIcon } from 'components';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { Token } from '@evolutionland/evolution-js';
import { useTokenBalance } from 'hooks/useBalance';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useTranslation } from 'react-i18next';
import { getIsSupportByModuleName } from 'config';
import { bundleApi } from 'api';
import { TransferTokenModal } from '../TransferTokenModal';
import { StyledButtonBox } from './styled';

export interface Props extends BareProps {
  token: Token;
  bg?: string;
  landId: SUPPORTED_LANDS_INDEX;
  account: string;
  crosschain?: boolean;
  xringmigration?: boolean;
}

const StyledTokenMain = styled.div<{ bg: string }>`
  align-items: center;
  background: ${({ bg, theme }) => theme.colors[bg] || theme.colors.background};
  ${tw`flex w-full justify-between rounded-2xl p-2`}
  ${({ theme }) => theme.mediaQueries.sm} {
    ${tw`p-3`}
  }
`;

const StyledTokenBackground = styled.div`
  background: ${({ theme }) => theme.colors.collapseBodyBackground};
`;

const CrossChainButton: React.FC = () => {
  const cBridgeUrl = `https://helixbridge.app/`;

  return (
    <Button as='a' className='flex-1' endIcon={<OpenNewIcon />} scale='sm' target='_blank' rel='noreferrer' href={cBridgeUrl}>
      Helix Bridge
    </Button>
  );
};

const XRINGMigrationButton: React.FC = () => (
  <Button as='a' className='flex-1' endIcon={<OpenNewIcon />} scale='sm' target='_blank' rel='noreferrer' href='https://token-migration.darwinia.network/'>
    Migration
  </Button>
);

const TokenMain: React.FC<Props> = ({ className, token, bg, landId, account, crosschain, xringmigration }) => {
  const { t } = useTranslation();

  const balance = useTokenBalance(landId, token?.address, account);
  const [onClickTransferToken] = useModal(<TransferTokenModal addressChecker={bundleApi[landId].isAddress} title={t(`Transfer Token Token`, { token: token?.symbol })} landId={landId} token={token} />);
  const isSupportTokenRegister = getIsSupportByModuleName(landId, 'WALLETTOKENREGISTER');

  return (
    <StyledTokenMain className={className} bg={bg}>
      <div className='flex-1'>
        <Flex justifyContent='space-between'>
          <StyledTokenBackground className='w-9 p-1 rounded-full'>
            <img src={`/images/token/${token?.symbol?.toLocaleLowerCase()}.svg`} alt={`${token?.symbol}`} />
          </StyledTokenBackground>
          <Flex className='space-x-1' alignItems='center' flex='1' px='5px'>
            <ScaleH1 px='8px'>{token?.symbol}</ScaleH1>
            <SwapLink landId={landId} token={token} />
            {isSupportTokenRegister && <TokenRegister landId={landId} token={token} />}
            <TokenLink landId={landId} token={token} />
          </Flex>
          <Flex alignItems='center'>
            <Text bold>{getFullDisplayBalance(balance, token?.decimals, 2)}</Text>
          </Flex>
        </Flex>
        <StyledButtonBox>
          <Button scale='sm' className='flex-1' onClick={onClickTransferToken} disabled={!account}>
            {t('Transfer')}
          </Button>
          {crosschain && <CrossChainButton />}
          {xringmigration && <XRINGMigrationButton />}
        </StyledButtonBox>
      </div>
    </StyledTokenMain>
  );
};

export default TokenMain;
