// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Skeleton, Text } from 'components';
import { useWeb3React } from '@web3-react/core';
import { FetchStatus, useGetEtherBalance } from 'hooks/useBalance';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { getExplorerLink } from 'utils';
import { formatBigNumber } from 'utils/formatBalance';
import { getRpcInfoByLandId } from 'config';
import { SUPPORTED_LANDS_INDEX } from 'types';
import CopyAddress from './CopyAddress';

interface WalletInfoProps {
  landId: SUPPORTED_LANDS_INDEX;
  hasLowEtherBalance: boolean;
  onDismiss: InjectedModalProps['onDismiss'];
}

const WalletInfo: React.FC<WalletInfoProps> = ({ landId, hasLowEtherBalance, onDismiss }) => {
  const { t } = useTranslation();
  const rpcInfo = getRpcInfoByLandId(landId);

  const { account } = useWeb3React();
  const { balance, fetchStatus } = useGetEtherBalance(landId);
  // const { balance: cakeBalance, fetchStatus: cakeFetchStatus } = useTokenBalance(tokens.cake.address)
  const { logout } = useAuth(landId);

  const handleLogout = () => {
    onDismiss();
    logout();
  };

  return (
    <>
      <Text color='secondary' fontSize='12px' textTransform='uppercase' fontWeight='bold' mb='8px'>
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb='24px' />
      {hasLowEtherBalance && (
        <Message variant='warning' mb='24px'>
          <Box>
            <Text fontWeight='bold'>{t('Balance Low')}</Text>
            <Text as='p'>{t('You need for transaction fees.')}</Text>
          </Box>
        </Message>
      )}
      <Flex alignItems='center' justifyContent='space-between'>
        <Text color='textSubtle'>{t('Balance')}</Text>
        {fetchStatus !== FetchStatus.SUCCESS ? (
          <Skeleton height='22px' width='60px' />
        ) : (
          <Text>
            {formatBigNumber(balance, 4)} {rpcInfo?.nativeCurrency?.symbol}
          </Text>
        )}
      </Flex>
      <Flex alignItems='center' justifyContent='end' mb='24px'>
        <LinkExternal href={getExplorerLink(landId, account, 'address')}>{t('View on Explorer')}</LinkExternal>
      </Flex>
      <Button variant='secondary' width='100%' onClick={handleLogout}>
        {t('Disconnect Wallet')}
      </Button>
    </>
  );
};

export default WalletInfo;
