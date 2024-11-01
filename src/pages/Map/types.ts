// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SUPPORTED_LANDS_INDEX } from 'types';

export type Land = {
  lat: number;
  lon: number;
  left?: number;
  top?: number;
  topLeft?: number;
  current_price?: number;
  status: string;
  genesis: boolean;
  owner: string;
  resource: string;
  as: string;
  token_id: string;
  landId: SUPPORTED_LANDS_INDEX;
  cover: string;
  image: HTMLImageElement;
};

export type Resource = {
  isReserved: boolean;
  goldRate: string;
  woodRate: string;
  waterRate: string;
  fireRate: string;
  soilRate: string;
  isSpecial: string;
  hasBox: string;
};

export interface AtlasTile extends Land {
  type: number;
}
