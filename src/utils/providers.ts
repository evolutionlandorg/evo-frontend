// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ethers } from 'ethers';
import Tronweb from 'tronweb';
import { SUPPORTED_LANDS_INDEX } from 'types';
import getRpcUrl from './getRpcUrl';

const simpleRpc = {};

export const simpleRpcProvider = (rpcUrl: string) => new ethers.providers.JsonRpcProvider(rpcUrl);

export const simpleRpcProviderByLandId = (landId: SUPPORTED_LANDS_INDEX) => {
  const rpcUrl = getRpcUrl(landId);
  if (landId === '2' && !simpleRpc[landId]) {
    simpleRpc[landId] = new Tronweb({ fullHost: rpcUrl }).trx;
  }

  if (!simpleRpc[landId]) {
    simpleRpc[landId] = new ethers.providers.JsonRpcProvider(rpcUrl);
  }

  return simpleRpc[landId];
};

export default null;
