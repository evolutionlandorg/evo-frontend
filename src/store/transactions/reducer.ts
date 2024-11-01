// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { addTransaction, checkedTransaction, clearAllTransactions, finalizeTransaction, SerializableTransactionReceipt } from './actions';

const now = () => new Date().getTime();

export enum OperationType {
  FurnaceForgeEquip,
  FurnaceUpgradeEquip,
  FurnaceDismantleEquip,
  FurnaceDismantleDrill,
  FurnaceUpgradeDrill
}

export interface TransactionDetailsCustomData {
  summary?: string;
  approval?: { tokenAddress: string; spender: string };
  claim?: { recipient: string };
  operation?: OperationType;
}

export interface TransactionDetails extends TransactionDetailsCustomData {
  hash: string;
  receipt?: SerializableTransactionReceipt;
  lastCheckedBlockNumber?: number;
  addedTime: number;
  confirmedTime?: number;
  from: string;
}

export interface TransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails;
  };
}

export const initialState: TransactionState = {};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addTransaction, (transactions, { payload: { chainId, hash, ...data } }) => {
      if (transactions[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.');
      }
      const txs = transactions[chainId] ?? {};
      txs[hash] = { hash, addedTime: now(), ...data };
      transactions[chainId] = txs;
    })
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
      if (!transactions[chainId]) return;
      transactions[chainId] = {};
    })
    .addCase(checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
      const tx = transactions[chainId]?.[hash];
      if (!tx) {
        return;
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
      }
    })
    .addCase(finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
      const tx = transactions[chainId]?.[hash];
      if (!tx) {
        return;
      }
      tx.receipt = receipt;
      tx.confirmedTime = now();
    })
);
