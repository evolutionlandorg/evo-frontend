// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { NetworkInfo } from 'config';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { Button, ButtonProps } from './Button';
import { useWalletModal } from './WalletModal';

interface Props extends ButtonProps, BareProps {
  network?: NetworkInfo;
  landId: SUPPORTED_LANDS_INDEX;
  noRounded?: boolean;
}

const ConnectWalletButton = ({ landId, noRounded, className, ...rest }: Props) => {
  const { t } = useTranslation();
  const { login, logout } = useAuth(landId);
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(landId, login, logout, t);

  return (
    <Button className={className} noRounded={noRounded} onClick={onPresentConnectModal} {...rest}>
      {t('Connect Wallet')}
    </Button>
  );
};

export default ConnectWalletButton;
