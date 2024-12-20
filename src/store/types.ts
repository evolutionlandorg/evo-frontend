// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ThunkAction } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, State, unknown, AnyAction>;

export interface BigNumberToJson {
  type: 'BigNumber';
  hex: string;
}

export type SerializedBigNumber = string;

interface SerializedFarmUserData {
  allowance: string;
  tokenBalance: string;
  stakedBalance: string;
  earnings: string;
}

export interface DeserializedFarmUserData {
  allowance: BigNumber;
  tokenBalance: BigNumber;
  stakedBalance: BigNumber;
  earnings: BigNumber;
}

export enum VaultKey {
  CakeVault = 'cakeVault',
  IfoPool = 'ifoPool'
}

interface CorePoolProps {
  startBlock?: number;
  endBlock?: number;
  apr?: number;
  stakingTokenPrice?: number;
  earningTokenPrice?: number;
  vaultKey?: VaultKey;
}

export interface Profile {
  userId: number;
  points: number;
  teamId: number;
  collectionAddress: string;
  tokenId: number;
  isActive: boolean;
  username: string;
  hasRegistered: boolean;
}

// Slices states

export interface VaultFees {
  performanceFee: number;
  callFee: number;
  withdrawalFee: number;
  withdrawalFeePeriod: number;
}

export interface VaultUser {
  isLoading: boolean;
  userShares: string;
  cakeAtLastUserAction: string;
  lastDepositedTime: string;
  lastUserActionTime: string;
}

export interface IfoVaultUser extends VaultUser {
  credit: string;
}

export enum ProfileAvatarFetchStatus {
  NOT_FETCHED = 'not-fetched',
  FETCHING = 'fetching',
  FETCHED = 'fetched'
}

export interface ProfileState {
  isInitialized: boolean;
  isLoading: boolean;
  hasRegistered: boolean;
  data: Profile;
  profileAvatars: {
    [key: string]: {
      username: string;
      hasRegistered: boolean;
      usernameFetchStatus: ProfileAvatarFetchStatus;
      avatarFetchStatus: ProfileAvatarFetchStatus;
    };
  };
}

export type TeamResponse = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: boolean;
};
export enum AchievementFetchStatus {
  ERROR = 'error',
  NOT_FETCHED = 'not-fetched',
  FETCHING = 'fetching',
  FETCHED = 'fetched'
}

// Block

export interface BlockState {
  currentBlock: number;
  initialBlock: number;
}

// Predictions

export enum BetPosition {
  BULL = 'Bull',
  BEAR = 'Bear',
  HOUSE = 'House'
}

export enum PredictionStatus {
  INITIAL = 'initial',
  LIVE = 'live',
  PAUSED = 'paused',
  ERROR = 'error'
}

export interface Round {
  id: string;
  epoch: number;
  position: BetPosition;
  failed: boolean;
  startAt: number;
  startBlock: number;
  startHash: string;
  lockAt: number;
  lockBlock: number;
  lockHash: string;
  lockPrice: number;
  lockRoundId: string;
  closeAt: number;
  closeBlock: number;
  closeHash: string;
  closePrice: number;
  closeRoundId: string;
  totalBets: number;
  totalAmount: number;
  bullBets: number;
  bullAmount: number;
  bearBets: number;
  bearAmount: number;
  bets?: Bet[];
}

export interface Market {
  paused: boolean;
  epoch: number;
}

export interface Bet {
  id?: string;
  hash?: string;
  amount: number;
  position: BetPosition;
  claimed: boolean;
  claimedAt: number;
  claimedBlock: number;
  claimedHash: string;
  claimedBNB: number;
  claimedNetBNB: number;
  createdAt: number;
  updatedAt: number;
  user?: PredictionUser;
  round?: Round;
}

export interface PredictionUser {
  id: string;
  createdAt: number;
  updatedAt: number;
  block: number;
  totalBets: number;
  totalBetsBull: number;
  totalBetsBear: number;
  totalBNB: number;
  totalBNBBull: number;
  totalBNBBear: number;
  totalBetsClaimed: number;
  totalBNBClaimed: number;
  winRate: number;
  averageBNB: number;
  netBNB: number;
  bets?: Bet[];
}

export enum HistoryFilter {
  ALL = 'all',
  COLLECTED = 'collected',
  UNCOLLECTED = 'uncollected'
}

export interface LedgerData {
  [key: string]: {
    [key: string]: ReduxNodeLedger;
  };
}

export interface RoundData {
  [key: string]: ReduxNodeRound;
}

export interface ReduxNodeLedger {
  position: BetPosition;
  amount: BigNumberToJson;
  claimed: boolean;
}

export interface NodeLedger {
  position: BetPosition;
  amount: ethers.BigNumber;
  claimed: boolean;
}

export interface ReduxNodeRound {
  epoch: number;
  startTimestamp: number | null;
  lockTimestamp: number | null;
  closeTimestamp: number | null;
  lockPrice: BigNumberToJson | null;
  closePrice: BigNumberToJson | null;
  totalAmount: BigNumberToJson;
  bullAmount: BigNumberToJson;
  bearAmount: BigNumberToJson;
  rewardBaseCalAmount: BigNumberToJson;
  rewardAmount: BigNumberToJson;
  oracleCalled: boolean;
  lockOracleId: string;
  closeOracleId: string;
}

export interface NodeRound {
  epoch: number;
  startTimestamp: number | null;
  lockTimestamp: number | null;
  closeTimestamp: number | null;
  lockPrice: ethers.BigNumber | null;
  closePrice: ethers.BigNumber | null;
  totalAmount: ethers.BigNumber;
  bullAmount: ethers.BigNumber;
  bearAmount: ethers.BigNumber;
  rewardBaseCalAmount: ethers.BigNumber;
  rewardAmount: ethers.BigNumber;
  oracleCalled: boolean;
  closeOracleId: string;
  lockOracleId: string;
}

export enum LeaderboardLoadingState {
  INITIAL,
  LOADING,
  IDLE
}

export type LeaderboardFilterTimePeriod = '1d' | '7d' | '1m' | 'all';

export interface LeaderboardFilter {
  address?: string;
  orderBy?: string;
  timePeriod?: LeaderboardFilterTimePeriod;
}

export interface PredictionsState {
  status: PredictionStatus;
  isLoading: boolean;
  isHistoryPaneOpen: boolean;
  isChartPaneOpen: boolean;
  isFetchingHistory: boolean;
  historyFilter: HistoryFilter;
  currentEpoch: number;
  intervalSeconds: number;
  minBetAmount: string;
  bufferSeconds: number;
  lastOraclePrice: string;
  history: Bet[];
  totalHistory: number;
  currentHistoryPage: number;
  hasHistoryLoaded: boolean;
  rounds?: RoundData;
  ledgers?: LedgerData;
  claimableStatuses: {
    [key: string]: boolean;
  };
  leaderboard: {
    selectedAddress: string;
    loadingState: LeaderboardLoadingState;
    filters: LeaderboardFilter;
    skip: number;
    hasMoreResults: boolean;
    addressResults: {
      [key: string]: PredictionUser;
    };
    results: PredictionUser[];
  };
}

// Voting

/* eslint-disable camelcase */
/**
 * @see https://hub.snapshot.page/graphql
 */
export interface VoteWhere {
  id?: string;
  id_in?: string[];
  voter?: string;
  voter_in?: string[];
  proposal?: string;
  proposal_in?: string[];
}

export enum SnapshotCommand {
  PROPOSAL = 'proposal',
  VOTE = 'vote'
}

export enum ProposalType {
  ALL = 'all',
  CORE = 'core',
  COMMUNITY = 'community'
}

export enum ProposalState {
  ACTIVE = 'active',
  PENDING = 'pending',
  CLOSED = 'closed'
}

export interface Space {
  id: string;
  name: string;
}

export type UserTicketsResponse = [ethers.BigNumber[], number[], boolean[]];

// Global state

export interface State {
  block: BlockState;
  predictions: PredictionsState;
  profile: ProfileState;
}
