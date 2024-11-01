// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from 'react';
import { connectorLocalStorageKey } from 'components/WalletModal';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { ConnectorNames } from 'components/WalletModal/types';
import useAuth from './useAuth';

const useEagerConnect = (landId: SUPPORTED_LANDS_INDEX) => {
  const { login } = useAuth(landId);

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames;

    if (connectorId) {
      login(connectorId);
    }
  }, [login]);
};

export default useEagerConnect;
