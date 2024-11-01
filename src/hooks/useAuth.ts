// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect, WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { connectorLocalStorageKey } from 'components/WalletModal';
import { getConnectorsByName } from 'utils/web3React';
import { setupNetwork } from 'utils/wallet';
import useToast from 'hooks/useToast';
import { getRpcInfoByLandId } from 'config';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { ConnectorNames } from 'components/WalletModal/types';

const useAuth = (landId: SUPPORTED_LANDS_INDEX) => {
  const { activate, deactivate } = useWeb3React();
  const { toastError } = useToast();
  const rpcInfo = getRpcInfoByLandId(landId);

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connectorsByName = getConnectorsByName(landId);
      const connector = connectorsByName[connectorID];
      if (connector) {
        activate(connector, async (error: Error) => {
          console.info('useAuth::activate ', error);

          if (error instanceof UnsupportedChainIdError) {
            const provider = await connector.getProvider();
            const hasSetup = await setupNetwork(rpcInfo, provider);
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            if (error instanceof NoEthereumProviderError) {
              toastError('Provider Error, wallet needs to be installed before connecting');
            } else if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = null;
              }
              toastError('Authorization Error', 'Please authorize to access your account');
            } else {
              console.info('useAuth', error);
              toastError(error.name, error.message);
            }
          }
        });
      } else {
        deactivate();
        // This localStorage key is set by @web3-react/walletconnect-connector
        window.localStorage.removeItem(connectorLocalStorageKey);
        // toastError('Unable to find connector', 'This wallet needs to be installed before connecting');
      }
    },
    [activate, deactivate, landId, rpcInfo, toastError]
  );

  const logout = useCallback(() => {
    // dispatch(profileClear())
    deactivate();
    // This localStorage key is set by @web3-react/walletconnect-connector
    try {
      if (window.localStorage.getItem('walletconnect')) {
        const connectorsByName = getConnectorsByName(landId);
        connectorsByName.walletconnect.close();
        connectorsByName.walletconnect.walletConnectProvider = null;
      }
    } catch (error) {
      console.info('walletconnect.close', error);
    }
    window.localStorage.removeItem(connectorLocalStorageKey);
  }, [deactivate, landId]);

  return { login, logout };
};

export default useAuth;
