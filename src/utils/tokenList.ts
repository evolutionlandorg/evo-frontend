// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SUPPORTED_LANDS_INDEX } from 'types';
import { LandConfig, Token } from '@evolutionland/evolution-js';
import { extendLandId } from '.';

export function getTokenResourceList(landId: SUPPORTED_LANDS_INDEX): Token[] {
  return [LandConfig[extendLandId(landId)].tokens.GOLD, LandConfig[extendLandId(landId)].tokens.WOOD, LandConfig[extendLandId(landId)].tokens.WATER, LandConfig[extendLandId(landId)].tokens.FIRE, LandConfig[extendLandId(landId)].tokens.SOIL];
}
