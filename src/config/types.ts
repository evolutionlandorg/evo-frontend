// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Token as EvoToken } from '@evolutionland/evolution-js';

export interface Token {
  symbol: string;
  address?: string;
  decimals?: number;
  name?: string;
  icon?: string;
}

export interface NetworkInfo {
  chainId: string;
  blockExplorerUrls: string[];
  chainName: string;
  iconUrls: string[];
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
}

export type ChainSymbol = keyof NetworkList;

export type LandIndex = '1' | '2' | '3' | '4' | '5';

export interface NetworkList {
  ethereum: NetworkInfo;
  ropsten: NetworkInfo;
  tron: NetworkInfo;
  shasta: NetworkInfo;
  crab: NetworkInfo;
  heco: NetworkInfo;
  hecoTestnet: NetworkInfo;
  polygon: NetworkInfo;
  mumbai: NetworkInfo;
}

export interface FarmStaker {
  stakerToken: EvoToken;
  token0?: EvoToken;
  token1?: EvoToken;
  targetToken?: EvoToken;
  lpExternalUrl?: string;
  staker?: string;
}
