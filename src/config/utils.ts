// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable import/no-cycle */
import { extendLandId } from 'utils';
import { LandConfig } from '@evolutionland/evolution-js';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { ContinentIndexEnum } from 'config/continents';
import env from './env';
import { NetworkInfo } from './types';
import { EvolutionLandModules } from './env/types';

export const getLandTokensConfig = (landId: SUPPORTED_LANDS_INDEX, isProd?: boolean) => LandConfig[extendLandId(landId, isProd)];

export const CONF_CURRENT_CONTINENT = {
  get index() {
    const _index = localStorage.getItem('CURRENT_CONTINENT_INDEX');
    return (_index && (Number(_index) as ContinentIndexEnum)) || ContinentIndexEnum.A;
  },

  set index(idx: ContinentIndexEnum) {
    localStorage.setItem('CURRENT_CONTINENT_INDEX', idx.toString());
  }
};

export const getRpcInfoByLandId = (landId: SUPPORTED_LANDS_INDEX): NetworkInfo => env[landId]?.RPC_INFO;

export const getSupportLandByModuleName = (moduleName: EvolutionLandModules) => env.SUPPORTED_MODULE[moduleName];

export const getIsSupportByModuleName = (landId: SUPPORTED_LANDS_INDEX, moduleName: EvolutionLandModules) => env.SUPPORTED_MODULE[moduleName].includes(landId);
