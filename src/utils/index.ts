// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { JsonRpcSigner, Web3Provider, TransactionResponse } from '@ethersproject/providers';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { LandId } from '@evolutionland/evolution-js/lib/config/constants';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { getRpcInfoByLandId } from 'config';
import BigNumber from 'bignumber.js';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function getExplorerLink(landId: SUPPORTED_LANDS_INDEX, data: string | number, type: 'transaction' | 'token' | 'address' | 'block' | 'countdown'): string {
  const rpc = getRpcInfoByLandId(landId);
  const domain = rpc.blockExplorerUrls[0];

  switch (type) {
    case 'transaction': {
      if (landId === '2') {
        return `${domain}transaction/${data}`;
      }
      return `${domain}tx/${data}`;
    }
    case 'token': {
      return `${domain}token/${data}`;
    }
    case 'block': {
      return `${domain}block/${data}`;
    }
    case 'countdown': {
      return `${domain}block/countdown/${data}`;
    }
    default: {
      return `${domain}address/${data}`;
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    return `${address.substring(0, chars)}...${address.substring(address.length - chars)}`;
    // throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function shortenString(str: string, chars = 4): string {
  if (str.length < chars * 2) {
    return str;
  }
  return `${str.substring(0, chars)}...${str.substring(str.length - chars)}`;
}

// add 10%
export function calculateGasMargin(value: EthersBigNumber): EthersBigNumber {
  return value.mul(EthersBigNumber.from(10000).add(EthersBigNumber.from(1000))).div(EthersBigNumber.from(10000));
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * Truncate a transaction or address hash
 */
export function truncateHash(address: string, startLength = 4, endLength = 4) {
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
}

export function capitalizedFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function extendLandId(landId: SUPPORTED_LANDS_INDEX, isProd = process.env.REACT_APP_CHAIN === 'mainnet'): LandId {
  if (isProd) {
    return parseInt(landId);
  }
  return parseInt(landId) + 1000;
}

export function responseCallback(response: TransactionResponse, callback: () => void) {
  if (response.wait) {
    response.wait(1).then(() => {
      callback && callback();
    });
  } else {
    callback && callback();
  }
}

export function toPercentage(num: number | string, displayDecimals = 2) {
  try {
    return `${new BigNumber(num).times(100).toFixed(displayDecimals)}%`;
  } catch (error) {
    return '--';
  }
}
