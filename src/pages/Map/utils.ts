// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { env } from 'config';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { isSameAddress } from 'utils/address';
import { $get } from 'utils/agent';
import { AtlasTile, Land } from './types';

export const GENESIS_HOLDER = Object.freeze(
  process.env.REACT_APP_CHAIN === 'mainnet'
    ? {
        1: '0x36f061bc3314793c5637fb79421294c061ead108',
        2: '41fd9ac1a0b242ba7116399174dd7ce5ff462e6c0f',
        3: '0x8abdE994A159056DD290171F749A357013B51fdC',
        4: '0x80a8F15a0A5bd734b8e71530ea8C377dd7AD8005',
        5: '0xa59975666061269fD52298C8D92207a1Bb012408'
      }
    : {
        1: '0xfe3ee13c28830f7f91bbb62305d3b616e49998ec',
        2: '4196c53cc5b77b6ef212c3db360dd3d4d33516787a',
        3: '0x84F4e9b619f1f456B67369369418E428E7ceAB3C',
        4: '0xE6FCe87bf75577759B2D075fD3d19e455df37956',
        5: '0xB0c14Ca271eE4B00ede33505203143C66645f6E4'
      }
);

export const COLOR_BY_TYPE = Object.freeze({
  0: '#ff9990', // my parcels
  1: '#ff4053', // my parcels on sale
  2: '#ff9990', // my estates
  3: '#ff4053', // my estates on sale

  4: '#9ac95e', // First Sale
  5: '#46f9da', // Reserved
  6: '#4d56ad', // Unowned
  7: '#ef4d5c', // Owned
  8: '#fe8846', // Mine
  9: '#319866', // On Sale / Resale
  10: '#b269d3', // Mysterious

  12: '#18141a', // background
  13: '#110e13', // loading odd
  14: '#0d0b0e' // loading even
});

export const decodeResource = (resourceString: string) => {
  const resourceArray = resourceString.split(',');

  return {
    isReserved: resourceArray[0] === '1',
    goldRate: resourceArray[1],
    woodRate: resourceArray[2],
    waterRate: resourceArray[3],
    fireRate: resourceArray[4],
    soilRate: resourceArray[5],
    isSpecial: resourceArray[6] === '1',
    hasBox: resourceArray[7] === '1'
  };
};

export function decodeLandType(landId: SUPPORTED_LANDS_INDEX, land: Land, owner: string) {
  const resource = decodeResource(land.resource);
  const genesisHolder = process.env.REACT_APP_CHAIN === 'mainnet' ? GENESIS_HOLDER[landId] : GENESIS_HOLDER[landId];

  if (resource.isReserved) {
    return 5;
  }

  if (land.status === 'onsell' && land.as !== 'unclaimed') {
    if (land.genesis) {
      return 4;
    }
    return 9;
  }

  if (resource.hasBox) {
    return 10;
  }

  if (isSameAddress(owner, land.owner)) {
    return 8;
  }

  if (land.status === 'fresh' && isSameAddress(genesisHolder, land.owner)) {
    return 6;
  }

  if (land.status === 'fresh' && !isSameAddress(genesisHolder, land.owner)) {
    return 7;
  }

  if (land.status === 'onsell' && land.as === 'unclaimed') {
    return 7;
  }

  return 12;
}

export async function loadTiles(landId: SUPPORTED_LANDS_INDEX, owner: string): Promise<Record<string, AtlasTile>> {
  const tiles = {};
  const apiNetwork = env[landId].BACKEND_API_NETWORK;
  const resp = await $get(`/api/lands?district=${landId}`, { 'EVO-NETWORK': apiNetwork });
  resp.data.forEach((land: Land) => {
    const image = new Image();
    image.src = land.cover;

    tiles[`${land.lon},${land.lat}`] = {
      ...land,
      landId,
      type: decodeLandType(landId, land, owner),
      image: land.cover ? image : null
    };
  });
  return tiles as Record<string, AtlasTile>;
}
