// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { EquipmentType } from './Equipment';

export interface EnhanceMaterials {
  element: string;
  lp: string;
}

export interface ForgeMaterials {
  [key: string]: string;
}

export interface EquipmentMetadata {
  class: EquipmentType;
  element: string;
  enhance: EnhanceMaterials;
  id: number;
  materials: ForgeMaterials;
  name: string;
  rarity: string;
  success_rate: string;
}

export interface EquipmentMetadataMap {
  [key: number]: EquipmentMetadata;
}

export type MetadataEquipments = Record<EquipmentType, EquipmentMetadataMap>;

export interface Metadata {
  equipments: MetadataEquipments;
}
