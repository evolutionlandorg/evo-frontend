// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type EquipmentType = 'Sword' | 'Shield';

export interface Equipment {
  apostle_token_id: string;
  equipment_token_id: string;
  level: number;
  object: EquipmentType;
  origin_owner: string;
  owner: string;
  prefer: string;
  rarity: number;
  slot: number;
}

// TODO: extract to apostle types file
interface Apostle {
  apostle_picture: string;
  name: string;
  slot: number;
  apostle_token_id: string;
}

export interface EquipmentDetail extends Omit<Equipment, 'apostle_token_id' | 'slot'> {
  apostle: Apostle;
}

export interface EquipmentInfo {
  name: string;
  image: string;

  attribute: string;
  attributeValue: number;

  numericalType: number;

  element?: string;
  elementValue?: number;
  elementImage?: string;
}
