// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { ButtonMenu, ButtonMenuItem, CloseIcon, IconButton, InjectedModalProps, ModalBody, ModalContainer, ModalHeader as UIKitModalHeader, ModalTitle } from 'components';
import { parseUnits } from 'ethers/lib/utils';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FetchStatus, useGetEtherBalance } from 'hooks/useBalance';
import { SUPPORTED_LANDS_INDEX } from 'types';
import WalletInfo from './WalletInfo';
import WalletTransactions from './WalletTransactions';

export enum WalletView {
  WALLET_INFO,
  TRANSACTIONS
}

interface WalletModalProps extends InjectedModalProps {
  landId: SUPPORTED_LANDS_INDEX;
  initialView?: WalletView;
}

export const LOW_ETHER_BALANCE = parseUnits('2', 'gwei');

const ModalHeader = styled(UIKitModalHeader)`
  background: ${({ theme }) => theme.colors.backgroundFocus};
`;

const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`;

const WalletModal: React.FC<WalletModalProps> = ({ landId, initialView = WalletView.WALLET_INFO, onDismiss }) => {
  const [view, setView] = useState(initialView);
  const { t } = useTranslation();
  const { balance, fetchStatus } = useGetEtherBalance(landId);
  const hasLowEtherBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_ETHER_BALANCE);

  const handleClick = (newIndex: number) => {
    setView(newIndex);
  };

  return (
    <ModalContainer title='Welcome' minWidth='320px'>
      <ModalHeader>
        <ModalTitle>{t('Your Wallet')}</ModalTitle>
        <IconButton variant='text' onClick={onDismiss}>
          <CloseIcon width='24px' color='text' />
        </IconButton>
      </ModalHeader>
      <Tabs>
        <ButtonMenu scale='sm' variant='subtle' onItemClick={handleClick} activeIndex={view} fullWidth>
          <ButtonMenuItem>{t('Wallet')}</ButtonMenuItem>
          <ButtonMenuItem>{t('Transactions')}</ButtonMenuItem>
        </ButtonMenu>
      </Tabs>
      <ModalBody p='24px' maxWidth='400px' width='100%'>
        {view === WalletView.WALLET_INFO && <WalletInfo landId={landId} hasLowEtherBalance={hasLowEtherBalance} onDismiss={onDismiss} />}
        {view === WalletView.TRANSACTIONS && <WalletTransactions landId={landId} />}
      </ModalBody>
    </ModalContainer>
  );
};

export default WalletModal;
