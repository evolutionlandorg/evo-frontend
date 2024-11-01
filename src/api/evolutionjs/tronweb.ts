// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { tronWebApi } from '@evolutionland/evolution-js';
import { getAddressByName } from '@evolutionland/evolution-js/lib/utils/ethers/addressHelper';
import { ethers } from 'ethers';
import { utils } from 'tronweb';

const HEX_PREFIX = '41';

const formatAddress = (address) => {
  if (!address) return undefined;
  return `${HEX_PREFIX}${address.substring(2)}`;
};

const toDisplayAddress = (hexAddress) => {
  const address = formatAddress(hexAddress);
  if (!address) return '';
  const bArr = utils.code.hexStr2byteArray(address);
  const retval = utils.crypto.getBase58CheckAddress(bArr);
  return retval;
};

const isAddress = (address: string): boolean => utils.crypto.isAddressValid(address);

const getCurrentBlockNumber = async (provider: any): Promise<number> => {
  const block = await provider.getCurrentBlock();
  return block.block_header.raw_data.number;
};

const getTransactionInfo = (library, tx) =>
  new Promise((resolve, reject) => {
    library.provider.trx.getTransaction(tx).then((data) => {
      const { ret } = data;
      if (!ret || ret.length === 0) {
        resolve(null);
      } else {
        resolve({
          blockHash: '',
          blockNumber: 0,
          contractAddress: '',
          from: '',
          status: ret[0]?.contractRet === 'SUCCESS' ? 1 : -1,
          to: '',
          transactionHash: data.txID,
          transactionIndex: 0
        });
      }
    });
  });

const signMessage = (signer: any, message: string) => signer.provider.trx.signMessage(message);

const signMessageWithMeta = async (signer: any, data: string) => {
  const json = {
    space: 'portal.evolution.land',
    timestamp: Date.now(),
    data
  };

  const message = JSON.stringify(json);
  const hexMessage = Buffer.from(message, 'utf8').toString('hex');
  console.info('personal sign message:', message, hexMessage);

  const signature = await signMessage(signer, hexMessage);
  console.info('personal sign signature:', signature);

  return [message, signature];
};

export default {
  ...tronWebApi,
  getAddressByName,
  formatAddress,
  toDisplayAddress,
  isAddress,
  getCurrentBlockNumber,
  getTransactionInfo,
  signMessageWithMeta
};
