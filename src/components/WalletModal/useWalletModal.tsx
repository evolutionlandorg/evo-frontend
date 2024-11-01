// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useModal } from '../Modal';
import ConnectModal from './ConnectModal';
import AccountModal from './AccountModal';
import { Login } from './types';

interface ReturnType {
  onPresentConnectModal: () => void;
  onPresentAccountModal: () => void;
}

const useWalletModal = (landId: SUPPORTED_LANDS_INDEX, login: Login, logout: () => void, t: (key: string) => string, account?: string): ReturnType => {
  const [onPresentConnectModal] = useModal(<ConnectModal landId={landId} login={login} t={t} />);
  const [onPresentAccountModal] = useModal(<AccountModal account={account || ''} logout={logout} t={t} />);
  return { onPresentConnectModal, onPresentAccountModal };
};

export default useWalletModal;
