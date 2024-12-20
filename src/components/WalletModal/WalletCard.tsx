// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { Button } from 'components';
import Text from '../Text/Text';
import MoreHorizontal from '../Svg/Icons/MoreHorizontal';
import { ButtonProps } from '../Button';
import { connectorLocalStorageKey, walletLocalStorageKey } from './config';
import { Login, Config, ConnectorNames } from './types';

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
}

const WalletButton = styled(Button).attrs({ width: '100%', variant: 'text', py: '16px' })`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

interface MoreWalletCardProps extends ButtonProps {
  t: (key: string) => string;
}

export const MoreWalletCard: React.FC<MoreWalletCardProps> = ({ t, ...props }) => {
  return (
    <WalletButton variant='tertiary' {...props}>
      <MoreHorizontal width='40px' mb='8px' color='textSubtle' />
      <Text fontSize='14px'>{t('More')}</Text>
    </WalletButton>
  );
};

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss }) => {
  const { title, icon: Icon } = walletConfig;

  return (
    <WalletButton
      variant='tertiary'
      onClick={() => {
        // @ts-ignore
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        // Since iOS does not support Trust Wallet we fall back to WalletConnect
        if (walletConfig.title === 'Trust Wallet' && isIOS) {
          login(ConnectorNames.WalletConnect);
        } else {
          login(walletConfig.connectorId);
        }

        localStorage.setItem(walletLocalStorageKey, walletConfig.title);
        localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
        onDismiss();
      }}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Icon width='40px' mb='8px' />
      <Text textAlign='center' fontSize='14px'>
        {title}
      </Text>
    </WalletButton>
  );
};

export default WalletCard;
