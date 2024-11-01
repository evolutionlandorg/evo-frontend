// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TransactionResponse } from '@ethersproject/providers';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { AppDispatch, AppState } from '../index';
import { addTransaction } from './actions';
import { TransactionDetails, TransactionDetailsCustomData } from './reducer';

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(landId: SUPPORTED_LANDS_INDEX): (response: TransactionResponse, customData?: TransactionDetailsCustomData) => void {
  const { chainId, account } = useActiveWeb3React(landId);
  const dispatch = useDispatch<AppDispatch>();

  return useCallback(
    (response: TransactionResponse, data: TransactionDetailsCustomData = {}) => {
      if (!account) return;
      if (!chainId) return;

      const { hash } = response;
      if (!hash) {
        throw Error('No transaction hash found.');
      }
      dispatch(addTransaction({ hash, from: account, chainId, ...data }));
    },
    [dispatch, chainId, account]
  );
}

// returns all the transactions for the current chain
export function useAllTransactions(landId: SUPPORTED_LANDS_INDEX): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React(landId);

  const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions);

  return chainId ? state[chainId] ?? {} : {};
}

export function useIsTransactionPending(landId: SUPPORTED_LANDS_INDEX, transactionHash?: string): boolean {
  const transactions = useAllTransactions(landId);

  if (!transactionHash || !transactions[transactionHash]) return false;

  return !transactions[transactionHash].receipt;
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000;
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(landId: SUPPORTED_LANDS_INDEX, tokenAddress: string | undefined, spender: string | undefined): boolean {
  const allTransactions = useAllTransactions(landId);
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some((hash) => {
        const tx = allTransactions[hash];
        if (!tx) return false;
        if (tx.receipt) {
          return false;
        }
        const { approval } = tx;
        if (!approval) return false;
        return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx);
      }),
    [allTransactions, spender, tokenAddress]
  );
}
