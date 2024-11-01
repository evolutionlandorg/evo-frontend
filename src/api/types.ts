// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Web3Provider } from '@ethersproject/providers';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import continents, { ContinentDistrictEnum, ContinentSerialEnum } from 'config/continents';
import * as contract from './contract';
import * as evo from './evo';
import * as utils from './utils';

export interface ApiProps extends Web3ReactContextInterface<Web3Provider> {
  contract: typeof contract;
  evo: typeof evo;
  utils: typeof utils;
  landId: SUPPORTED_LANDS_INDEX;
  evolutionApi: any;
}
