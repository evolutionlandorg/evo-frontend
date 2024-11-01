// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Element, SUPPORTED_LANDS_INDEX } from 'types';

export interface StatusResponse {
  code?: number;
  data?: any;
  detail?: string;
}

export interface Land {
  id: number;
  name: string;
  owner: string;
  token_id: string;
  land_id: number;
  auction_start_at: number;
  current_price: string;
  gx: number;
  gy: number;
  lon: number;
  lat: number;
  status?: string;
  apostle_worker?: Apostle[];
  resource: LandResource;
  drills?: DrillLandEquip[];
  introduction?: string;
  land_url?: string;
  cover?: string;
  district: SUPPORTED_LANDS_INDEX;
  token: AuctionToken;
}

export interface AuctionToken {
  address: string;
  decimals: number;
  symbol: string;
}

export interface LandAuction {
  claim_waiting: number;
  current_price: string;
  current_time: number;
  duration: number;
  end_price: string;
  history: LandAuctionHistoryItem[];
  // land_claim_reward: string;
  last_bid_start: number;
  last_price: string;
  seller: string;
  seller_name: string;
  start_at: number;
  start_price: string;
  status: string;
  winner_address: string;
  winner_name: string;
  winner: string;
  token: AuctionToken;
}

export interface LandAuctionHistoryItem {
  bid_price: string;
  tx_id: string;
  buyer: string;
  start_at: number;
  name: string;
}

export interface LandRecord {
  claim_time: number;
  create_tx: string;
  final_price: string;
  seller: string;
  winner: string;
}

export interface LandResource {
  fire_rate: number;
  gold_rate: number;
  has_box: number;
  is_reserved: number;
  is_special: number;
  soil_rate: number;
  water_rate: number;
  wood_rate: number;
}

export interface Apostle {
  apostle_picture: string;
  apostle_status: string;
  apostle_talent: ApostleTalent;
  talent: ApostleTalent;
  apostle_children?: BasicApostle[];
  apostle_father?: BasicApostle;
  apostle_mother?: BasicApostle;
  bind_pet_count: number;
  current_price: string;
  birth_fee: string;
  birth_time: number;
  cold_down: number;
  cold_down_end: number;
  created_at: string;
  gen: number;
  gender: string;
  genes: string;
  haberger_mode: number;
  has_bid: boolean;
  id: number;
  introduction: string;
  is_alien: boolean;
  member_id: number;
  mine_last_bid: boolean;
  mother: string;
  name: string;
  origin_id: number;
  origin_owner: string;
  origin_owner_name: string;
  owner: string;
  owner_name: string;
  pets: null;
  system_sell: boolean;
  token_id: string;
  token_index: number;
  worker_end: number;
  working: ApostleWorkInfo;
  working_status: string;
  dig_element?: Element;
  strength?: string;
  auction_start_at: number;
  in_adventure: boolean;
  duration: number;
  token: AuctionToken;
}

export interface ApostleWorkInfo {
  dig_element: Element;
  duration: number;
  land_id: number;
  lat: number;
  lon: number;
  owner: string;
  price: string;
  seller: string;
  seller_name: string;
  strength: string;
  token_index: number;
}

export interface BasicApostle {
  apostle_mother: string;
  apostle_picture: string;
  token_id: string;
  token_index: string;
}

export interface ApostleResourceLevel {
  element_fire: number;
  element_gold: number;
  element_soil: number;
  element_water: number;
  element_wood: number;
}

export interface ApostleTalent extends ApostleResourceLevel {
  life: number;
  life_add: number;
  mood: number;
  mood_add: number;
  strength: number;
  strength_add: number;
  agile: number;
  agile_add: number;
  finesse: number;
  finesse_add: number;
  hp: number;
  hp_add: number;
  intellect: number;
  intellect_add: number;
  lucky: number;
  lucky_add: number;
  mining_power: string;
  potential: number;
  potential_add: number;
  charm: number;
  charm_add: number;
  atk: string;
  crit: string;
  def: string;
  hp_limit: string;
}

export interface ApostleAuction {
  claim_waiting: number;
  current_price: string;
  current_time: number;
  duration: number;
  end_price: string;
  history: any[];
  last_bid_start: number;
  last_price: string;
  seller: string;
  seller_name: string;
  start_at: number;
  start_price: string;
  status: string;
  winner: string;
  token: AuctionToken;
}

export interface ApostleAttribute {
  id: number;
  title: string;
  title_en: string;
  value: number;
}

export interface ApostleAttributes {
  expression: ApostleAttribute;
  eye: ApostleAttribute;
  eye_color: ApostleAttribute;
  feature: ApostleAttribute;
  feature_color: ApostleAttribute;
  hair: ApostleAttribute;
  hair_color: ApostleAttribute;
  profile: ApostleAttribute;
  profile_color: ApostleAttribute;
  surroundings: ApostleAttribute;
}

export interface RequestBareProps {
  landId: SUPPORTED_LANDS_INDEX;
}

export interface Drill {
  chain: string;
  class: number;
  create_time: number;
  formula_id: number;
  formula_index: number;
  grade: number;
  origin_owner: string;
  owner: string;
  prefer: Element | '';
  token_id: string;
  land_equip: DrillLandEquip;
}

export interface DrillLandEquip {
  drill_token_id: string;
  equip_time: number;
  formula_id: number;
  index: number;
  land_token_id: string;
  owner: string;
  owner_name: string;
  prefer: Element;
  resource: Element;
}

export interface IllustratedMinor {
  LP: string;
  element: string;
}

export interface Illustrated {
  can_disenchant: boolean;
  class: number;
  grade: number;
  id: number;
  index: number;
  issued: number;
  major_id: number;
  minor: IllustratedMinor;
  name: string;
  objectClassExt: number;
  pic: string;
  productivity: string[];
  protection_period: number;
  sort: number;
}

export type FurnaceTreasureType = 'gold' | 'silver';

export interface FurnaceTreasure {
  id: number;
  title: string;
  type: FurnaceTreasureType;
  image: string;
}

// export interface DrillDetail {
//   class: number;
//   create_time: number;
//   formula_id: number;
//   formula_index: number;
//   grade: number;
//   land_equip: DrillLandEquip;
//   origin_owner: string;
//   owner: string;
//   prefer: Element;
// }

export interface FarmAPR {
  apr: string;
  decimals: string;
  symbol: string;
}

export interface LandRank {
  count: number;
  name: string;
  owner: string;
}

export interface ElementRaffleHistory {
  ID: number;
  tx: string;
  owner: string;
  chain: string;
  element: string;
  timestamp: number;
  is_win: boolean;
  draw_method: 'Large' | 'Small';
  prize_type: 'land' | 'apostle';
  prize_token_id: '';
}
