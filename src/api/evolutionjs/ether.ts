// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ethersApi } from '@evolutionland/evolution-js';
import { getAddressByName } from '@evolutionland/evolution-js/lib/utils/ethers/addressHelper';
import Web3 from 'web3';
import { ethers } from 'ethers';

const formatAddress = (address) => address;

const toDisplayAddress = (address) => address;

const isAddress = (address: string): boolean => Web3.utils.isAddress(address);

const getCurrentBlockNumber = async (provider: any): Promise<number> => {
  const blockNumber = await provider.getBlockNumber();
  return blockNumber;
};

const getTransactionInfo = (library, tx) => library.getTransactionReceipt(tx);

const signMessage = (signer: ethers.Signer, message: string) => signer.signMessage(message);

const signMessageWithMeta = async (signer: ethers.Signer, data: string) => {
  const json = {
    space: 'portal.evolution.land',
    timestamp: Date.now(),
    data
  };

  const message = JSON.stringify(json);
  console.info('personal sign message:', message);

  const signature = await signMessage(signer, message);
  console.info('personal sign signature:', signature);

  return [message, signature];
};

export default {
  ...ethersApi,
  getAddressByName,
  formatAddress,
  toDisplayAddress,
  isAddress,
  getCurrentBlockNumber,
  getTransactionInfo,
  signMessageWithMeta
};
