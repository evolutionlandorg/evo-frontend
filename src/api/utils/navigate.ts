// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { History } from 'history';
import { formatTokenId } from './format';

export const getDetailPageLink = (landIndex: string, type: 'land' | 'apostle' | 'drill' | 'furnacetreasure' | 'material', tokenId: string, isEdit?: boolean): string => `/land/${landIndex}/${type}/${formatTokenId(tokenId)}${isEdit ? '/edit' : ''}`;

export const navigateToDetail = (history: History, landIndex: string, type: 'land' | 'apostle' | 'drill' | 'furnacetreasure' | 'material', tokenId: string, isEdit?: boolean): void => {
  history.push(getDetailPageLink(landIndex, type, tokenId, isEdit));
};

export const navigateToLand = (history: History, landIndex: string): void => {
  history.push(`/land/${landIndex}/my/token`);
};

export const navigateToMaterial = (history: History, landIndex: string, materialId: number): void => {
  history.push(`/land/${landIndex}/material/${materialId}`);
};
