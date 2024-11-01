// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Flex, LogoutIcon, useModal } from 'components';
import useAuth from 'hooks/useAuth';
import ConnectWalletButton from 'components/ConnectWalletButton';
import { FetchStatus, useGetEtherBalance } from 'hooks/useBalance';
import { useTranslation } from 'react-i18next';
import { useCurrentLand } from 'hooks/useRouterParams';
import { UAuthConnector } from '@uauth/web3-react';
import UIKitUserMenu from './Menu';
import WalletModal, { WalletView, LOW_ETHER_BALANCE } from './WalletModal';
import WalletUserMenuItem from './WalletUserMenuItem';
import { UserMenuItem, UserMenuDivider } from './Menu/styles';

const UserMenu = () => {
  const { t } = useTranslation();
  const { account, connector } = useWeb3React();
  const [text, setText] = useState('');
  const landId = useCurrentLand();
  const { logout } = useAuth(landId);
  const { balance, fetchStatus } = useGetEtherBalance(landId);
  const [onPresentWalletModal] = useModal(<WalletModal landId={landId} initialView={WalletView.WALLET_INFO} />);
  const [onPresentTransactionModal] = useModal(<WalletModal landId={landId} initialView={WalletView.TRANSACTIONS} />);
  // const [onPresentSwitchLandModal] = useModal(<SwitchLandModal title='Choose a continent' landId={landId} history={history} />);
  const avatarSrc = null;
  const hasLowEtherBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_ETHER_BALANCE);

  useEffect(() => {
    // https://docs.unstoppabledomains.com/login-with-unstoppable/login-integration-guides/login-ui-configuration/
    if ((connector as UAuthConnector)?.uauth) {
      (connector as UAuthConnector)?.uauth
        .user()
        .then((data) => {
          setText(data.sub);
        })
        .catch((err) => {
          console.info('UserMenu::UAuthConnector', err);
        });
    } else {
      setText('');
    }
  }, [connector]);

  if (!account) {
    return <ConnectWalletButton noRounded className='rounded-none' landId={landId} />;
  }

  return (
    <UIKitUserMenu landId={landId} account={account} text={text} avatarSrc={avatarSrc}>
      <WalletUserMenuItem hasLowEtherBalance={hasLowEtherBalance} onPresentWalletModal={onPresentWalletModal} />
      <UserMenuItem as='button' onClick={onPresentTransactionModal}>
        {t('Transactions')}
      </UserMenuItem>
      <UserMenuDivider />
      <UserMenuItem as='button' onClick={logout}>
        <Flex alignItems='center' justifyContent='space-between' width='100%'>
          {t('Disconnect')}
          <LogoutIcon />
        </Flex>
      </UserMenuItem>
    </UIKitUserMenu>
  );
};

export default UserMenu;
