// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getRpcInfoByLandId } from 'config';
// import { TronInjectConnector } from 'utils/troninject-connector';
import { ethers } from 'ethers';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { getConnectorsByLandId } from 'components/WalletModal/config';
import { ConnectorNames } from 'components/WalletModal/types';

export interface TronWeb {
  trx: any;
}

const POLLING_INTERVAL = 12000;

export const getConnectorsByName = (landId: SUPPORTED_LANDS_INDEX): { [connectorName in ConnectorNames]: any } => {
  const rpcInfo = getRpcInfoByLandId(landId);
  const connectors = getConnectorsByLandId(landId);
  const result = {};

  // if (chainId === 11111 || chainId === 11112) {
  //   const troninjectConnect = new TronInjectConnector({ supportedChainIds: [chainId] });
  //   return {
  //     [ConnectorNames.Injected]: null,
  //     [ConnectorNames.WalletConnect]: null,
  //     [ConnectorNames.TronInjectConnect]: troninjectConnect,
  //   };
  // }

  connectors.forEach((connector) => {
    result[connector.connectorId] = connector.creator(rpcInfo);
  });

  return result as { [connectorName in ConnectorNames]: any };
};

export const getLibrary = (provider: ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc): ethers.providers.Web3Provider | any => {
  // const library = new ethers.providers.Web3Provider(provider);
  // library.pollingInterval = POLLING_INTERVAL;

  // console.info('getLibrary', provider, provider.trx);

  // @ts-ignore
  if (provider.trx) {
    return {
      provider,
      getSigner: () => {
        return { provider };
      }
    };
  }

  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;

  return library;
};
