// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ethers } from 'ethers';
import { simpleRpcProviderByLandId } from 'utils/providers';
import erc20Abi from 'config/abi/erc20.json';
import { SUPPORTED_LANDS_INDEX } from 'types';

const getContract = (landId: SUPPORTED_LANDS_INDEX, abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProviderByLandId(landId);
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getErc20Contract = (landId, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(landId, erc20Abi, address, signer);
};
