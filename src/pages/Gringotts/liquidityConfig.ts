// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getAddressByName } from '@evolutionland/evolution-js/lib/utils/ethers/addressHelper';
import { CompactToken } from '@evolutionland/evolution-js/lib/api/ethers';
import { bundleApi } from 'api';
import { extendLandId } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';

export const getPairs = (landId: SUPPORTED_LANDS_INDEX): CompactToken[][] => {
  return [
    [
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_GOLD'),
        decimals: 18,
        symbol: 'GOLD'
      },
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_RING'),
        decimals: 18,
        symbol: 'RING'
      }
    ],

    [
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_WOOD'),
        decimals: 18,
        symbol: 'WOOD'
      },
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_RING'),
        decimals: 18,
        symbol: 'RING'
      }
    ],

    [
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_WATER'),
        decimals: 18,
        symbol: 'HHO'
      },
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_RING'),
        decimals: 18,
        symbol: 'RING'
      }
    ],

    [
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_FIRE'),
        decimals: 18,
        symbol: 'FIRE'
      },
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_RING'),
        decimals: 18,
        symbol: 'RING'
      }
    ],

    [
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_SOIL'),
        decimals: 18,
        symbol: 'SIOO'
      },
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_RING'),
        decimals: 18,
        symbol: 'RING'
      }
    ],

    [
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_WETH'),
        decimals: 18,
        symbol: 'wETH'
      },
      {
        address: bundleApi[landId].getAddressByName(extendLandId(landId), 'TOKEN_RING'),
        decimals: 18,
        symbol: 'RING'
      }
    ]
  ];
};
