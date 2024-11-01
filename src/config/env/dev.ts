// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EnvCfg } from './types';
import { NETWORK_LIST } from '../network';
// eslint-disable-next-line import/no-cycle
import { FarmStakerTokens } from '../farm';

const config = {
  '1': {
    NAME: 'Atlantis',
    RPC_INFO: NETWORK_LIST.ropsten,
    BACKEND_API_NETWORK: 'Eth',
    SERIAL: 'a'
  },
  '2': {
    NAME: 'Byzantine',
    RPC_INFO: NETWORK_LIST.shasta,
    BACKEND_API_NETWORK: 'Tron',
    SERIAL: 'b'
  },
  '3': {
    NAME: 'Columbus',
    RPC_INFO: NETWORK_LIST.crab,
    BACKEND_API_NETWORK: 'Crab',
    FARM_TOKENS: FarmStakerTokens[3].dev,
    SERIAL: 'c'
  },
  '4': {
    NAME: 'Dawning',
    RPC_INFO: NETWORK_LIST.hecoTestnet,
    BACKEND_API_NETWORK: 'Heco',
    FARM_TOKENS: FarmStakerTokens[4].dev,
    SERIAL: 'd'
  },
  '5': {
    NAME: 'Eden',
    RPC_INFO: NETWORK_LIST.mumbai,
    BACKEND_API_NETWORK: 'Polygon',
    FARM_TOKENS: FarmStakerTokens[5].dev,
    SERIAL: 'e'
  },
  SUPPORTED_MODULE: {
    THE_GRAPH: ['3', '5'],
    RING_TOKENFALLBACK: ['1', '2'],
    HELIX_BRIDGE: ['1', '3'],
    APOSTLE_ARENA: ['3', '4', '5'],
    FARM: ['3', '4', '5'],
    DRILL: ['1', '3', '4', '5'],
    WALLETTOKENREGISTER: ['1', '3', '4', '5'],
    GOV: ['1', '3', '4', '5'],
    HARVEST: ['1', '3', '4', '5'],
    FURNACE: ['1', '3', '4', '5'],
    GOLD_RUSH: ['1', '3', '4', '5'],
    XRING_TO_XWRING: ['3']
  },
  GAME_DOMAIN: 'https://evo-static-dev.vercel.app'
} as EnvCfg;

export default config;
