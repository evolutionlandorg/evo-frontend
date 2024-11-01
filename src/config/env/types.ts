// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SUPPORTED_LANDS_INDEX } from 'types';
import { NetworkInfo, FarmStaker } from '../types';

export type EvolutionLandModules = 'THE_GRAPH' | 'RING_TOKENFALLBACK' | 'HELIX_BRIDGE' | 'APOSTLE_ARENA' | 'FARM' | 'DRILL' | 'WALLETTOKENREGISTER' | 'GOV' | 'HARVEST' | 'FURNACE' | 'GOLD_RUSH' | 'XRING_TO_XWRING';

export interface LandConfig {
  NAME: string;
  RPC_INFO: NetworkInfo;
  BACKEND_API_NETWORK: string;
  FARM_TOKENS?: FarmStaker[];
  FARM_TOKENS_DEPRECATED?: FarmStaker[];
  SERIAL: string;
}

export enum LAND_INDEX_ENUM {
  ETHEREUM = '1',
  TRON = '2',
  CRAB = '3',
  HECO = '4',
  POLYGON = '5'
}

export interface EnvCfg {
  '1': LandConfig;
  '2': LandConfig;
  '3': LandConfig;
  '4': LandConfig;
  '5': LandConfig;
  GAME_DOMAIN: string;
  SUPPORTED_MODULE: Record<EvolutionLandModules, SUPPORTED_LANDS_INDEX[]>;
}
