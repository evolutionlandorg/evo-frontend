// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { bundleApi } from 'api';
import { ToastDescriptionWithTx } from 'components/Toast';
import { BIG_ZERO } from 'utils/bigNumber';
import { extendLandId, responseCallback } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useTransactionAdder } from 'store/transactions/hooks';
import useRefresh from './useRefresh';
import useActiveWeb3React from './useActiveWeb3React';
import useToast from './useToast';

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export type CallbackHandler = () => void;

export const useLotteryGetUserPoints = (landId: SUPPORTED_LANDS_INDEX, account: string): BigNumber => {
  const { library } = useActiveWeb3React(landId);
  const { fastRefresh } = useRefresh();
  const [pointsBalance, setPointsBalance] = useState<BigNumber>(BIG_ZERO);

  useEffect(() => {
    async function fetchUserPoints() {
      const result = await bundleApi[landId].lottery.lotteryGetPointsBalance(extendLandId(landId), library, account);
      setPointsBalance(new BigNumber(result));
    }

    if (account) {
      fetchUserPoints();
    }
  }, [account, fastRefresh, landId, library]);

  return pointsBalance;
};

export const useLotteryGetTotalRewardInPool = (landId: SUPPORTED_LANDS_INDEX): BigNumber => {
  const { library } = useActiveWeb3React(landId);
  const { slowRefresh } = useRefresh();
  const [totalReward, setTotalReward] = useState<BigNumber>(BIG_ZERO);

  useEffect(() => {
    async function fetchUserPoints() {
      const pool = await bundleApi[landId].lottery.lotteryGetTotalRewardInPool(extendLandId(landId), library);
      setTotalReward(new BigNumber(pool));
    }

    fetchUserPoints();
  }, [slowRefresh, library, landId]);

  return totalReward;
};

export const useLotteryPlayWithTicket = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleLotteryPlayWithTicket = useCallback(
    async (type: 's' | 'l') => {
      try {
        setPendingTx(true);

        const tx = await bundleApi[landId].lottery.lotteryPlayWithTicket(extendLandId(landId), library.getSigner(), type as 's');
        addTransaction(tx, {
          summary: `Events: Join lottery`
        });
        responseCallback(tx, () => setPendingTx(false));
      } catch (e) {
        console.error(e);
        setPendingTx(false);
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
      }
    },
    [addTransaction, landId, library, toastError]
  );

  return { handleLotteryPlayWithTicket, pendingTx };
};
