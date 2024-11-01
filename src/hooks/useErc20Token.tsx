// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import { bundleApi } from 'api';
import BigNumber from 'bignumber.js';
import { Token, SUPPORTED_LANDS_INDEX } from 'types';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { responseCallback } from 'utils';
import { useTransactionAdder } from 'store/transactions/hooks';
import useActiveWeb3React from './useActiveWeb3React';
import useToast from './useToast';

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export type CallbackHandler = () => void;

export const useErc20TokenTransfer = (landId: SUPPORTED_LANDS_INDEX, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleErc20TokenTransfer = useCallback(
    async (token: Token, to: string, amount: string) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].erc20.erc20TransferByContractAddress(library.getSigner(), token.address, to, amount);
        addTransaction(tx, {
          summary: `Token: Transfer ${getFullDisplayBalance(new BigNumber(amount), token.decimals, 2)} ${token.symbol}.`
        });
        responseCallback(tx, () => {
          setPendingTx(false);
          callback && callback();
        });
      } catch (e) {
        console.error(e);
        setPendingTx(false);
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
      }
    },
    [addTransaction, callback, landId, library, toastError]
  );

  return { handleErc20TokenTransfer, pendingTx };
};
