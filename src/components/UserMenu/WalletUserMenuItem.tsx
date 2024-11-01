// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Flex, WarningIcon } from 'components';
import { useTranslation } from 'react-i18next';
import { UserMenuItem } from './Menu/styles';

interface WalletUserMenuItemProps {
  hasLowEtherBalance: boolean;
  onPresentWalletModal: () => void;
}

const WalletUserMenuItem: React.FC<WalletUserMenuItemProps> = ({ hasLowEtherBalance, onPresentWalletModal }) => {
  const { t } = useTranslation();

  return (
    <UserMenuItem as='button' onClick={onPresentWalletModal}>
      <Flex alignItems='center' justifyContent='space-between' width='100%'>
        {t('Wallet')}
        {hasLowEtherBalance && <WarningIcon color='warning' width='24px' />}
      </Flex>
    </UserMenuItem>
  );
};

export default WalletUserMenuItem;
