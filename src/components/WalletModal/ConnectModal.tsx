// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import getThemeValue from 'utils/getThemeValue';
import { SUPPORTED_LANDS_INDEX } from 'types';
import Grid from '../Box/Grid';
import Box from '../Box/Box';
import Text from '../Text/Text';
import { Button } from '../Button';
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from '../Modal';
import WalletCard, { MoreWalletCard } from './WalletCard';
import { getConnectorsByLandId, walletLocalStorageKey } from './config';
import { Config, Login } from './types';

interface Props {
  landId: SUPPORTED_LANDS_INDEX;
  login: Login;
  onDismiss?: () => void;
  displayCount?: number;
  t: (key: string) => string;
}

const WalletWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig: Config[]) => {
  const preferredWalletName = localStorage.getItem(walletLocalStorageKey);
  const sortedConfig = walletConfig.sort((a: Config, b: Config) => a.priority - b.priority);

  if (!preferredWalletName) {
    return sortedConfig;
  }

  const preferredWallet = sortedConfig.find((sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName);

  if (!preferredWallet) {
    return sortedConfig;
  }

  return [preferredWallet, ...sortedConfig.filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName)];
};

const ConnectModal: React.FC<Props> = ({ landId, login, onDismiss = () => null, displayCount = 3, t }) => {
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  const config = getConnectorsByLandId(landId);
  const sortedConfig = getPreferredConfig(config);
  const displayListConfig = showMore ? sortedConfig : sortedConfig.slice(0, displayCount);

  return (
    <ModalContainer minWidth='320px'>
      <ModalHeader background={getThemeValue('colors.gradients.bubblegum')(theme)}>
        <ModalTitle>
          <p>{t('Connect Wallet')}</p>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody width={['320px', null, '340px']}>
        <WalletWrapper py='24px' maxHeight='453px' overflowY='auto'>
          <Grid gridTemplateColumns='1fr 1fr'>
            {displayListConfig.map((wallet) => (
              <Box key={wallet.title}>
                <WalletCard walletConfig={wallet} login={login} onDismiss={onDismiss} />
              </Box>
            ))}
            {!showMore && <MoreWalletCard t={t} onClick={() => setShowMore(true)} />}
          </Grid>
        </WalletWrapper>
        <Box p='24px'>
          <Text textAlign='center' color='textSubtle' as='p' mb='16px'>
            {t('Haven’t got a crypto wallet yet?')}
          </Text>
          <Button as='a' target='_blank' rel='noopener noreferrer' href='https://docs.evolution.land/getting-started/get-started/wallets' variant='subtle' width='100%'>
            {t('Learn How to Connect')}
          </Button>
        </Box>
      </ModalBody>
    </ModalContainer>
  );
};

export default ConnectModal;
