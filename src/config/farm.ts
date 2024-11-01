// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChainId, Token } from '@evolutionland/evolution-js';
import { getAddLPUrl, landIndexToDex } from 'utils/dex';
import { FarmStaker } from './types';
// eslint-disable-next-line import/no-cycle
import { getLandTokensConfig } from './utils';

type FarmStakerTokens = {
  [key: string]: {
    dev: FarmStaker[];
    prod: FarmStaker[];
    prod_deprecated?: FarmStaker[];
  };
};

const crab_RING = getLandTokensConfig('3', true).tokens.RING;

// @ts-ignore
const crab_XRING = getLandTokensConfig('3', false).tokens.XRING;
// NOTE: maybe generate blow configs by iteration
export const FarmStakerTokensPre: FarmStakerTokens = {
  '1': {
    dev: [],
    prod: []
  },
  '2': {
    dev: [],
    prod: []
  },
  '3': {
    dev: [
      {
        stakerToken: new Token(ChainId.CRABTESTNET, '0x55Ca5B31C1883Be971f1B41e75cA8D98B939E9Ac', 18, 'GOLD-RING LP', 'GOLD-RING LP'),
        token0: getLandTokensConfig('3', false).tokens.GOLD,
        token1: crab_XRING,
        targetToken: crab_XRING
      },
      {
        stakerToken: new Token(ChainId.CRABTESTNET, '0x7f08bC6a84FfC8Fdc5C96FC641E643680018c071', 18, 'WOOD-RING LP', 'WOOD-RING LP'),
        token0: getLandTokensConfig('3', false).tokens.WOOD,
        token1: crab_XRING,
        targetToken: crab_XRING
      },
      {
        stakerToken: new Token(ChainId.CRABTESTNET, '0xe25E06428aae51d5Af6D0417E55c901B15e9C34B', 18, 'WATER-RING LP', 'WATER-RING LP'),
        token0: getLandTokensConfig('3', false).tokens.WATER,
        token1: crab_XRING,
        targetToken: crab_XRING
      },
      {
        stakerToken: new Token(ChainId.CRABTESTNET, '0xCD1C143E590f3b7a3a3f2C146B6D29074E13009f', 18, 'FIRE-RING LP', 'FIRE-RING LP'),
        token0: getLandTokensConfig('3', false).tokens.FIRE,
        token1: crab_XRING,
        targetToken: crab_XRING
      },
      {
        stakerToken: new Token(ChainId.CRABTESTNET, '0xe56e70F1a03646DDa368476D253059A33a4393e9', 18, 'SOIL-RING LP', 'SOIL-RING LP'),
        token0: getLandTokensConfig('3', false).tokens.SOIL,
        token1: crab_XRING,
        targetToken: crab_XRING
      }
      // {
      //   stakerToken: new Token(ChainId.CRABTESTNET, '0x3129Fe69765ebD21eFcf92C8D9402153De41960E', 18, 'SOIL-RING LP', 'SOIL-RING LP'),
      //   token0: getLandTokensConfig('3', false).tokens.WETH,
      //   token1: getLandTokensConfig('3', false).tokens.RING,
      //   targetToken: getLandTokensConfig('3', false).tokens.RING
      // }
    ],
    prod_deprecated: [
      {
        stakerToken: new Token(ChainId.CRAB, '0x8e97f45bD127E7af3034d82a34d665746d348841', 18, 'GOLD-RING LP', 'GOLD-RING LP'),
        token0: getLandTokensConfig('3', true).tokens.GOLD,
        token1: crab_XRING,
        targetToken: crab_XRING,
        staker: '0x595Ef7c4Ab61D6F9Fe9b368dC83cE7FD9aeC0d83'
      },
      {
        stakerToken: new Token(ChainId.CRAB, '0x3710F045307d7e0906F1Fbd0B0dF12c0Bc787382', 18, 'WOOD-RING LP', 'WOOD-RING LP'),
        token0: getLandTokensConfig('3', true).tokens.WOOD,
        token1: crab_XRING,
        targetToken: crab_XRING,
        staker: '0x6317Fe2f7a7Bbbd08770CB6E0a8523292F74a9D0'
      },
      {
        stakerToken: new Token(ChainId.CRAB, '0xdb279D65225162280fACae2F3Ca8A3D2F63ea9BF', 18, 'WATER-RING LP', 'WATER-RING LP'),
        token0: getLandTokensConfig('3', true).tokens.WATER,
        token1: crab_XRING,
        targetToken: crab_XRING,
        staker: '0xE77164DC95057337E40367F66416bE6D394D6fe6'
      },
      {
        stakerToken: new Token(ChainId.CRAB, '0x15f2fBD98a0657e2afcAB08922632e58B1cC9FdD', 18, 'FIRE-RING LP', 'FIRE-RING LP'),
        token0: getLandTokensConfig('3', true).tokens.FIRE,
        token1: crab_XRING,
        targetToken: crab_XRING,
        staker: '0xD02F1E68bc8973AE8638FAfcCbb8a22D010661C8'
      },
      {
        stakerToken: new Token(ChainId.CRAB, '0x1E4b46582bbA7E5Ddb107d3a640e441774980525', 18, 'SOIL-RING LP', 'SOIL-RING LP'),
        token0: getLandTokensConfig('3', true).tokens.SOIL,
        token1: crab_XRING,
        targetToken: crab_XRING,
        staker: '0xB74200016e1296F2a41e7EFe44b3908F5762c859'
      },
      {
        stakerToken: new Token(ChainId.CRAB, '0xF157c9393255Db1728bC6483c3545Ca8a1655a0F', 18, 'RING-CRAB LP', 'RING-WCRAB LP'),
        token0: crab_XRING,
        token1: getLandTokensConfig('3', true).tokens.WETH,
        targetToken: crab_XRING,
        staker: '0x33Dcd10d19a4875637fDc359D1eb4Ff6972AB5C0'
      }
    ],
    prod: [
      {
        stakerToken: new Token(ChainId.CRAB, '0x506C391b6c1eb4911241A918de5c3984A603E112', 18, 'GOLD-RING LP', 'GOLD-RING LP'),
        token0: getLandTokensConfig('3', true).tokens.GOLD,
        token1: crab_RING,
        targetToken: crab_RING
      },
      {
        stakerToken: new Token(ChainId.CRAB, '0x2Eb5b4A0624d6E646Ba2aD919411072476FA1568', 18, 'WOOD-RING LP', 'WOOD-RING LP'),
        token0: getLandTokensConfig('3', true).tokens.WOOD,
        token1: crab_RING,
        targetToken: crab_RING
      },
      {
        stakerToken: new Token(ChainId.CRAB, '0xd4b2b19a62500bb32a731a0889eF0b5147A963E4', 18, 'WATER-RING LP', 'WATER-RING LP'),
        token0: getLandTokensConfig('3', true).tokens.WATER,
        token1: crab_RING,
        targetToken: crab_RING
      },
      {
        stakerToken: new Token(ChainId.CRAB, '0xA946116131932f2a6B5f2A2A52007418d706168A', 18, 'FIRE-RING LP', 'FIRE-RING LP'),
        token0: getLandTokensConfig('3', true).tokens.FIRE,
        token1: crab_RING,
        targetToken: crab_RING
      },
      {
        stakerToken: new Token(ChainId.CRAB, '0x76F6877Ac6b03BF80AB911DE4580C51dcb358927', 18, 'SOIL-RING LP', 'SOIL-RING LP'),
        token0: getLandTokensConfig('3', true).tokens.SOIL,
        token1: crab_RING,
        targetToken: crab_RING
      },
      {
        stakerToken: new Token(ChainId.CRAB, '0x05F0Bc920A23D1662764907910b150C819C110aa', 18, 'RING-CRAB LP', 'RING-WCRAB LP'),
        token0: crab_RING,
        token1: getLandTokensConfig('3', true).tokens.WETH,
        targetToken: crab_RING
      }
    ]
  },
  '4': {
    dev: [
      {
        stakerToken: new Token(ChainId.HECOTESTNET, '0xaa3616Cf90B82fAA88a3a0e5a705a96a6ea75030', 18, 'GOLD-RING LP', 'GOLD-RING LP'),
        token0: getLandTokensConfig('4', false).tokens.GOLD,
        token1: getLandTokensConfig('4', false).tokens.RING,
        targetToken: getLandTokensConfig('4', false).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.HECOTESTNET, '0x786754872d4D994B8975f4012f47b4C5551544F3', 18, 'WOOD-RING LP', 'WOOD-RING LP'),
        token0: getLandTokensConfig('4', false).tokens.WOOD,
        token1: getLandTokensConfig('4', false).tokens.RING,
        targetToken: getLandTokensConfig('4', false).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.HECOTESTNET, '0x6836123396Eef3bdC83bb8297eBF8396e2F9001d', 18, 'WATER-RING LP', 'WATER-RING LP'),
        token0: getLandTokensConfig('4', false).tokens.WATER,
        token1: getLandTokensConfig('4', false).tokens.RING,
        targetToken: getLandTokensConfig('4', false).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.HECOTESTNET, '0x04571F18BB7F0Bd7754EDC4Aab8D6671A05A22Fe', 18, 'FIRE-RING LP', 'FIRE-RING LP'),
        token0: getLandTokensConfig('4', false).tokens.FIRE,
        token1: getLandTokensConfig('4', false).tokens.RING,
        targetToken: getLandTokensConfig('4', false).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.HECOTESTNET, '0x712c0C2d01295EA53B84D89F112E24bfEd4D307F', 18, 'SOIL-RING LP', 'SOIL-RING LP'),
        token0: getLandTokensConfig('4', false).tokens.SOIL,
        token1: getLandTokensConfig('4', false).tokens.RING,
        targetToken: getLandTokensConfig('4', false).tokens.RING
      }
    ],
    prod: [
      {
        stakerToken: new Token(ChainId.HECO, '0x8C318CD47D8DD944d969307B1249062197267564', 18, 'GOLD-RING LP', 'GOLD-RING LP'),
        token0: getLandTokensConfig('4', true).tokens.GOLD,
        token1: getLandTokensConfig('4', true).tokens.RING,
        targetToken: getLandTokensConfig('4', true).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.HECO, '0x2Fbe5228a08260DB7bFed841cd4b340C88E13b9A', 18, 'WOOD-RING LP', 'WOOD-RING LP'),
        token0: getLandTokensConfig('4', true).tokens.WOOD,
        token1: getLandTokensConfig('4', true).tokens.RING,
        targetToken: getLandTokensConfig('4', true).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.HECO, '0xc8f8ba346781447a3e060eE913f56C2323fa83E5', 18, 'WATER-RING LP', 'WATER-RING LP'),
        token0: getLandTokensConfig('4', true).tokens.WATER,
        token1: getLandTokensConfig('4', true).tokens.RING,
        targetToken: getLandTokensConfig('4', true).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.HECO, '0xDD6F102f7044f5a8635AA9DaAC1483C5ce5265A3', 18, 'FIRE-RING LP', 'FIRE-RING LP'),
        token0: getLandTokensConfig('4', true).tokens.FIRE,
        token1: getLandTokensConfig('4', true).tokens.RING,
        targetToken: getLandTokensConfig('4', true).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.HECO, '0x31BF5eaA7C761871c83d9748b00a2277657cD6f5', 18, 'SOIL-RING LP', 'SOIL-RING LP'),
        token0: getLandTokensConfig('4', true).tokens.SOIL,
        token1: getLandTokensConfig('4', true).tokens.RING,
        targetToken: getLandTokensConfig('4', true).tokens.RING
      },
      // {
      //   stakerToken: new Token(ChainId.HECO, '0xcdB3FC40BC0D97A930f0D6F6f776CEfdb29C92b0', 18, 'DUSD-RING LP', 'DUSD-RING LP'),
      //   token0: getLandTokensConfig('4', true).tokens.SOIL,
      //   token1: getLandTokensConfig('4', true).tokens.RING,
      //   targetToken: getLandTokensConfig('4', true).tokens.RING
      // },
      {
        stakerToken: new Token(ChainId.HECO, '0x55C643AcA8b4cBaB1dBA05393fc0687bFbb9A98d', 18, 'HT-RING LP', 'WHT-RING LP'),
        token0: getLandTokensConfig('4', true).tokens.WETH,
        token1: getLandTokensConfig('4', true).tokens.RING,
        targetToken: getLandTokensConfig('4', true).tokens.RING
      }
    ]
  },
  '5': {
    dev: [
      {
        stakerToken: new Token(ChainId.MUMBAI, '0x03C9039E616cb5a3A56859525c79c3B920D200b4', 18, 'GOLD-RING LP', 'GOLD-RING LP'),
        token0: getLandTokensConfig('5', false).tokens.GOLD,
        token1: getLandTokensConfig('5', false).tokens.RING,
        targetToken: getLandTokensConfig('5', false).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.MUMBAI, '0xCc1f04e2b8c1c72DDE93a39f372a318370517e04', 18, 'WOOD-RING LP', 'WOOD-RING LP'),
        token0: getLandTokensConfig('5', false).tokens.WOOD,
        token1: getLandTokensConfig('5', false).tokens.RING,
        targetToken: getLandTokensConfig('5', false).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.MUMBAI, '0x26d8E1581CC5b9A41187c379C5c7B0b057D113A6', 18, 'WATER-RING LP', 'WATER-RING LP'),
        token0: getLandTokensConfig('5', false).tokens.WATER,
        token1: getLandTokensConfig('5', false).tokens.RING,
        targetToken: getLandTokensConfig('5', false).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.MUMBAI, '0xF8465D30B1A28668306aAd1E1d75f477d7353956', 18, 'FIRE-RING LP', 'FIRE-RING LP'),
        token0: getLandTokensConfig('5', false).tokens.FIRE,
        token1: getLandTokensConfig('5', false).tokens.RING,
        targetToken: getLandTokensConfig('5', false).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.MUMBAI, '0x8b4476f3686a8672870E7F3c3D2dC5429BA9ea53', 18, 'SOIL-RING LP', 'SOIL-RING LP'),
        token0: getLandTokensConfig('5', false).tokens.SOIL,
        token1: getLandTokensConfig('5', false).tokens.RING,
        targetToken: getLandTokensConfig('5', false).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.MUMBAI, '0x90A6Ab74fb1170dD9AB82C037F39DE8336A20A39', 18, 'RING-MATIC LP', 'RING-MATIC LP'),
        token0: getLandTokensConfig('5', false).tokens.RING,
        token1: getLandTokensConfig('5', false).tokens.WETH,
        targetToken: getLandTokensConfig('5', false).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.MUMBAI, '0x585754dA3dd1bD42Cc58e8e7a2cD75BE8492ADD7', 18, 'KTON-MATIC LP', 'KTON-MATIC LP'),
        token0: getLandTokensConfig('5', false).tokens.KTON,
        token1: getLandTokensConfig('5', false).tokens.WETH,
        targetToken: getLandTokensConfig('5', false).tokens.RING
      }
    ],
    prod: [
      {
        stakerToken: new Token(ChainId.POLYGON, '0x2D489AeA7b643B49108dffd948891A4D88040ef1', 18, 'GOLD-RING LP', 'GOLD-RING LP'),
        token0: getLandTokensConfig('5', true).tokens.GOLD,
        token1: getLandTokensConfig('5', true).tokens.RING,
        targetToken: getLandTokensConfig('5', true).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.POLYGON, '0x9686f71715134ccB38367849c049A58f6552C668', 18, 'WOOD-RING LP', 'WOOD-RING LP'),
        token0: getLandTokensConfig('5', true).tokens.WOOD,
        token1: getLandTokensConfig('5', true).tokens.RING,
        targetToken: getLandTokensConfig('5', true).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.POLYGON, '0x98b0e9849D610394a29a0FC33476cA497315f1c3', 18, 'WATER-RING LP', 'WATER-RING LP'),
        token0: getLandTokensConfig('5', true).tokens.WATER,
        token1: getLandTokensConfig('5', true).tokens.RING,
        targetToken: getLandTokensConfig('5', true).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.POLYGON, '0x90e3653a7aDb60E9184622B640dBf0A6EDA06858', 18, 'FIRE-RING LP', 'FIRE-RING LP'),
        token0: getLandTokensConfig('5', true).tokens.FIRE,
        token1: getLandTokensConfig('5', true).tokens.RING,
        targetToken: getLandTokensConfig('5', true).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.POLYGON, '0xA1b2216DB6Dbb4fCead88180b753dA0EcC42b626', 18, 'SOIL-RING LP', 'SOIL-RING LP'),
        token0: getLandTokensConfig('5', true).tokens.SOIL,
        token1: getLandTokensConfig('5', true).tokens.RING,
        targetToken: getLandTokensConfig('5', true).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.POLYGON, '0x610A9007FD86C960ccB717783f88347A2c154D4E', 18, 'RING-MATIC LP', 'RING-MATIC LP'),
        token0: getLandTokensConfig('5', true).tokens.RING,
        token1: getLandTokensConfig('5', true).tokens.WETH,
        targetToken: getLandTokensConfig('5', true).tokens.RING
      },
      {
        stakerToken: new Token(ChainId.POLYGON, '0x33D6683912457adE6137EC0c97c5864B2Cf3176C', 18, 'KTON-MATIC LP', 'KTON-MATIC LP'),
        token0: getLandTokensConfig('5', true).tokens.KTON,
        token1: getLandTokensConfig('5', true).tokens.WETH,
        targetToken: getLandTokensConfig('5', true).tokens.RING
      }
    ]
  }
};

const generateLpExternalUrl = (StakerTokens: FarmStakerTokens) => {
  const result: FarmStakerTokens = { ...StakerTokens };
  Object.keys(StakerTokens).forEach((landIndex) => {
    const { dev, prod } = StakerTokens[landIndex];

    result[landIndex].dev = dev.map((item) => ({
      ...item,
      lpExternalUrl: getAddLPUrl(item.token0, item.token1, landIndexToDex[landIndex])
    }));

    result[landIndex].prod = prod.map((item) => ({
      ...item,
      lpExternalUrl: getAddLPUrl(item.token0, item.token1, landIndexToDex[landIndex])
    }));
  });

  return result;
};
const generateFarmStakerTokens = (stakerTokens: FarmStakerTokens) => {
  const stakerTokensWithLP = generateLpExternalUrl(stakerTokens);

  return stakerTokensWithLP;
};

export const FarmStakerTokens = generateFarmStakerTokens(FarmStakerTokensPre);
