// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SUPPORTED_LANDS_INDEX } from 'types';
import { CONF_CURRENT_CONTINENT } from 'config';
import continents, { ContinentDistrictEnum, ContinentSerialEnum } from 'config/continents';
import TronWeb from 'tronweb';
import Web3 from 'web3';
import env from 'config/env';

export * from './navigate';
export * from './format';

const ASSETS_HOST = process.env.REACT_APP_ASSETS_HOST;

export const test = (): void => {
  console.log('This is utils index');
};

export const isEthAddress = (address: string, chainId?: number | undefined): boolean => {
  return Web3.utils.isAddress(address, chainId);
};

export const isTronAddress = (address: string): boolean => {
  return TronWeb.isAddress(address);
};

export const landSticker = (gx: number, gy: number, landId: SUPPORTED_LANDS_INDEX): string => {
  const serial = env[landId].SERIAL;
  return `${ASSETS_HOST}/land/${serial.toLowerCase()}/g${gx}-${gy}.png`;
};
