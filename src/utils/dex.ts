// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Token } from '@evolutionland/evolution-js';
import { LAND_INDEX_ENUM } from 'config/env/types';

export enum DEX_URL {
  UNISWAP = 'https://app.uniswap.org/',
  MDEX = 'https://ht.mdex.co/',
  QUICKSWAP = 'https://legacy.quickswap.exchange/',
  SNOWSWAP = 'https://snowswap.xyz/',
  SUNSWAP = 'https://sunswap.com/'
}

export const landIndexToDex = {
  [LAND_INDEX_ENUM.ETHEREUM]: DEX_URL.UNISWAP,
  // [LAND_INDEX_ENUM.TRON]: DEX_URL.SUNSWAP,
  [LAND_INDEX_ENUM.CRAB]: DEX_URL.SNOWSWAP,
  [LAND_INDEX_ENUM.HECO]: DEX_URL.MDEX,
  [LAND_INDEX_ENUM.POLYGON]: DEX_URL.QUICKSWAP
};

/**
 * obtain a url to go to the page to add LP token
 * @param token0 a token used for paring to get LP
 * @param token1 another token used for paring to get LP
 * @param dexUrl a url for paring LP
 * @returns a url to go to the page to add LP token
 */
export function getAddLPUrl(token0: Token, token1: Token, dexUrl: DEX_URL) {
  return `${dexUrl}#/add/${token0.address}/${token1.address}`;
}

export function getRemoveLPUrl(token0: Token, token1: Token, dexUrl: DEX_URL) {
  return `${dexUrl}#/remove/${token0.address}/${token1.address}`;
}

/**
 * obtain a url to swap specified token
 * @param landIndex the index of land
 * @param input a token contract address used for swapping
 * @param output a token contract address which points to the output of this swap
 * @returns a url to swap specified token
 */
export function getSwapUrl(landIndex: LAND_INDEX_ENUM | string, input?: string, output?: string) {
  const params = [];
  if (!landIndexToDex[landIndex]) {
    return '';
  }

  if (input) {
    params.push(`inputCurrency=${input}`);
  }

  if (output) {
    params.push(`outputCurrency=${output}`);
  }

  const paramsStringify = params.length ? `?${params.join('&')}` : '';

  return `${landIndexToDex[landIndex]}#/swap${paramsStringify}`;
}
