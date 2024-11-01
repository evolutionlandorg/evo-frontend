// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NetworkList } from './types';

export const NETWORK_LIST: NetworkList = {
  // ethereum
  ethereum: {
    chainId: '0x1',
    blockExplorerUrls: ['https://etherscan.io/'],
    chainName: 'Ethereum Network',
    iconUrls: [''],
    nativeCurrency: {
      name: 'Ethereum Network Token',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.infura.io/v3/765be903d16d44bdbc4cc45653c1434e']
  },
  ropsten: {
    chainId: '0x3',
    blockExplorerUrls: ['https://ropsten.etherscan.io/'],
    chainName: 'Ropsten Test Network',
    iconUrls: [],
    nativeCurrency: {
      name: 'Ethereum Ropsten Network Token',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://ropsten.infura.io/v3/765be903d16d44bdbc4cc45653c1434e']
  },
  // tron
  // The original id is 1, in order to distinguish it from the ethereum mainnet, use 11112
  tron: {
    chainId: '0x2B68',
    blockExplorerUrls: ['https://tronscan.org/#/'],
    chainName: 'Tron Network',
    iconUrls: [],
    nativeCurrency: {
      name: 'Tron Network Token',
      symbol: 'TRX',
      decimals: 6
    },
    rpcUrls: ['https://api.trongrid.io']
  },
  shasta: {
    chainId: '0x2B67',
    blockExplorerUrls: ['https://shasta.tronscan.org/#/'],
    chainName: 'Tron Shasta Network',
    iconUrls: [],
    nativeCurrency: {
      name: 'Tron Shasta Network Token',
      symbol: 'TRX',
      decimals: 6
    },
    rpcUrls: ['https://api.shasta.trongrid.io']
  },
  // crab
  crab: {
    chainId: '0x2C',
    blockExplorerUrls: ['https://crab.subview.xyz/'],
    chainName: 'Crab Smart Chain',
    iconUrls: ['https://portal.evolution.land/images/token/crab.svg'],
    nativeCurrency: {
      name: 'Crab Network Native Token',
      symbol: 'CRAB',
      decimals: 18
    },
    rpcUrls: ['https://crab-rpc.darwinia.network']
  },
  // heco
  heco: {
    chainId: '0x80',
    blockExplorerUrls: ['https://hecoinfo.com/'],
    chainName: 'Heco Chain',
    iconUrls: ['https://portal.evolution.land/images/token/ht.svg'],
    nativeCurrency: {
      name: 'Huobi ECO Chain Token',
      symbol: 'HT',
      decimals: 18
    },
    rpcUrls: ['https://http-mainnet.hecochain.com']
  },
  hecoTestnet: {
    chainId: '0x100',
    blockExplorerUrls: ['https://testnet.hecoinfo.com/'],
    chainName: 'Heco Testnet',
    iconUrls: ['https://portal.evolution.land/images/token/ht.svg'],
    nativeCurrency: {
      name: 'Huobi ECO Chain Token',
      symbol: 'HT',
      decimals: 18
    },
    rpcUrls: ['https://http-testnet.hecochain.com']
  },
  // polygon
  polygon: {
    chainId: '0x89',
    blockExplorerUrls: ['https://polygonscan.com/'],
    chainName: 'Polygon Chain',
    iconUrls: ['https://portal.evolution.land/images/token/matic.svg'],
    nativeCurrency: {
      name: 'Polygon Chain Token',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com']
  },
  mumbai: {
    chainId: '0x13881',
    blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    chainName: 'Polygon Mumbai',
    iconUrls: ['https://portal.evolution.land/images/token/matic.svg'],
    nativeCurrency: {
      name: 'test Matic',
      symbol: 'Matic',
      decimals: 18
    },
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com']
  }
};
