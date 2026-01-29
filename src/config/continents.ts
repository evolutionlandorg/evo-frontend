// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type SUPPORTED_LANDS_TYPE = '1' | '2' | '3' | '4' | '5';

export const SUPPORTED_LANDS: SUPPORTED_LANDS_TYPE[] = ['1', '2', '4', '5'];

export const SUPPORTED_LANDS_FOR_ROUTER = SUPPORTED_LANDS.join('|');

export enum ContinentIndexEnum {
  A = 1,
  B = 2,
  C = 3,
  D = 4,
  E = 5
}

export enum ContinentDistrictEnum {
  A = '1',
  B = '2',
  C = '3',
  D = '4',
  E = '5'
}

export enum ContinentNameEnum {
  A = 'atlantis',
  B = 'byzantine',
  C = 'columbus',
  D = 'dawning',
  E = 'eden'
}

export enum ContinentSerialEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E'
}

export enum ContinentShortEnum {
  A = 'Eth',
  B = 'Tron',
  C = 'Crab',
  D = 'Heco',
  E = 'Polygon'
}

export interface ContinentCfg {
  index: ContinentIndexEnum;
  district: ContinentDistrictEnum;
  name: ContinentNameEnum;
  serial: ContinentSerialEnum;
  short: ContinentShortEnum;
}

const continents = new Map<ContinentDistrictEnum, ContinentCfg>();

continents.set(ContinentDistrictEnum.A, {
  index: ContinentIndexEnum.A,
  district: ContinentDistrictEnum.A,
  name: ContinentNameEnum.A,
  serial: ContinentSerialEnum.A,
  short: ContinentShortEnum.A
});

continents.set(ContinentDistrictEnum.B, {
  index: ContinentIndexEnum.B,
  district: ContinentDistrictEnum.B,
  name: ContinentNameEnum.B,
  serial: ContinentSerialEnum.B,
  short: ContinentShortEnum.B
});

continents.set(ContinentDistrictEnum.C, {
  index: ContinentIndexEnum.C,
  district: ContinentDistrictEnum.C,
  name: ContinentNameEnum.C,
  serial: ContinentSerialEnum.C,
  short: ContinentShortEnum.C
});

continents.set(ContinentDistrictEnum.D, {
  index: ContinentIndexEnum.D,
  district: ContinentDistrictEnum.D,
  name: ContinentNameEnum.D,
  serial: ContinentSerialEnum.D,
  short: ContinentShortEnum.D
});

continents.set(ContinentDistrictEnum.E, {
  index: ContinentIndexEnum.E,
  district: ContinentDistrictEnum.E,
  name: ContinentNameEnum.E,
  serial: ContinentSerialEnum.E,
  short: ContinentShortEnum.E
});

export default continents;
