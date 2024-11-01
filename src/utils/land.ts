// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { LandResource } from 'hooks/backendApi';
import isString from 'lodash/isString';

export const getLandCoordinates = (lon: number, lat: number): string => `${lon},${lat}`;

export const parseResource = (resource: string | LandResource = '0, 0, 0, 0, 0, 0, 0, 0'): LandResource => {
  if (isString(resource)) {
    const r = resource.split(',');
    return {
      is_reserved: Number(r[0]),
      gold_rate: Number(r[1]),
      wood_rate: Number(r[2]),
      water_rate: Number(r[3]),
      fire_rate: Number(r[4]),
      soil_rate: Number(r[5]),
      is_special: Number(r[6]),
      has_box: Number(r[7])
    };
  }

  return resource;
};

export const pad0xBegin = (str: string): string => (str.startsWith('0x') ? str : `0x${str}`);
