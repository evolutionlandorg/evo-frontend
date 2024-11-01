// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Button } from 'antd';
import Flex from '../Box/Flex';
import { Modal } from '../Modal';
import CopyToClipboard from './CopyToClipboard';
import { connectorLocalStorageKey } from './config';

interface Props {
  account: string;
  logout: () => void;
  onDismiss?: () => void;
  t: (key: string) => string;
}

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null, t }) => (
  <Modal title={t('Your wallet')} onDismiss={onDismiss}>
    <p>{account}</p>
    <Flex mb='32px'>
      <a href={`https://bscscan.com/address/${account}`}>{t('View on BscScan')}</a>
      <CopyToClipboard toCopy={account}>{t('Copy Address')}</CopyToClipboard>
    </Flex>
    <Flex justifyContent='center'>
      <Button
        onClick={() => {
          logout();
          window.localStorage.removeItem(connectorLocalStorageKey);
          onDismiss();
        }}
      >
        {t('Logout')}
      </Button>
    </Flex>
  </Modal>
);

export default AccountModal;
