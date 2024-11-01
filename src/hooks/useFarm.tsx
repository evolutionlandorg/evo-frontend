// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { bundleApi } from 'api';
import { extendLandId, responseCallback } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import BigNumber from 'bignumber.js';
import { BIG_ZERO } from 'utils/bigNumber';
import { useTransactionAdder } from 'store/transactions/hooks';
import useActiveWeb3React from './useActiveWeb3React';
import useToast from './useToast';
import useRefresh from './useRefresh';

export type CallbackHandler = () => void;

export const useFarmGetStakerAddress = (landId: SUPPORTED_LANDS_INDEX, stakerToken: string): string => {
  const { library } = useActiveWeb3React(landId);
  const { slowRefresh } = useRefresh();
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const result = await bundleApi[landId].farm.farmGetStakerAddress(extendLandId(landId), library, stakerToken);
      setAddress(result);
    }

    if (stakerToken) {
      fetchData();
    }
  }, [slowRefresh, library, landId, stakerToken]);

  return address;
};

export const useFarmGetStakerEarned = (landId: SUPPORTED_LANDS_INDEX, stakerContractAddress: string, account: string): BigNumber => {
  const { library } = useActiveWeb3React(landId);
  const { slowRefresh } = useRefresh();
  const [earned, setEarned] = useState<BigNumber>(BIG_ZERO);

  useEffect(() => {
    async function fetchData() {
      const result = await bundleApi[landId].farm.farmGetStakerEarned(extendLandId(landId), library, stakerContractAddress, account);
      setEarned(new BigNumber(result));
    }

    if (stakerContractAddress) {
      fetchData();
    }
  }, [slowRefresh, library, landId, stakerContractAddress, account]);

  return earned;
};

export const useFarmGetStakerTotalSupply = (landId: SUPPORTED_LANDS_INDEX, stakerContractAddress: string): BigNumber => {
  const { library } = useActiveWeb3React(landId);
  const { slowRefresh } = useRefresh();
  const [totalSupply, setTotalSupply] = useState<BigNumber>(BIG_ZERO);

  useEffect(() => {
    async function fetchData() {
      const result = await bundleApi[landId].farm.farmGetStakerTotalSupply(extendLandId(landId), library, stakerContractAddress);
      setTotalSupply(new BigNumber(result));
    }

    if (stakerContractAddress) {
      fetchData();
    }
  }, [slowRefresh, library, landId, stakerContractAddress]);

  return totalSupply;
};

export const useFarmGetStakerBalanceOf = (landId: SUPPORTED_LANDS_INDEX, stakerContractAddress: string, account: string): BigNumber => {
  const { library } = useActiveWeb3React(landId);
  const { slowRefresh } = useRefresh();
  const [balance, setBalance] = useState<BigNumber>(BIG_ZERO);

  useEffect(() => {
    async function fetchData() {
      const result = await bundleApi[landId].farm.farmGetStakerBalanceOf(extendLandId(landId), library, stakerContractAddress, account);
      setBalance(new BigNumber(result));
    }

    if (stakerContractAddress) {
      fetchData();
    }
  }, [slowRefresh, library, landId, stakerContractAddress, account]);

  return balance;
};

export const useFarmStakeToken = (landId: SUPPORTED_LANDS_INDEX, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleFarmStakeToken = useCallback(
    async (stakerContractAddress: string, amount: string) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].farm.farmGetStakerStakeToken(extendLandId(landId), library.getSigner(), stakerContractAddress, amount);
        addTransaction(tx, {
          summary: `Farm: Stake Token`
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

  return { handleFarmStakeToken, pendingTx };
};

export const useFarmStakerWithdraw = (landId: SUPPORTED_LANDS_INDEX, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleFarmStakerWithdraw = useCallback(
    async (stakerContractAddress: string, amount: string) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].farm.farmStakerWithdraw(extendLandId(landId), library.getSigner(), stakerContractAddress, amount);
        addTransaction(tx, {
          summary: `Farm: Unstake token`
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

  return { handleFarmStakerWithdraw, pendingTx };
};

export const useFarmStakerClaim = (landId: SUPPORTED_LANDS_INDEX, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleFarmStakerClaim = useCallback(
    async (stakerContractAddress: string) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].farm.farmGetStakerGetReward(extendLandId(landId), library.getSigner(), stakerContractAddress);
        addTransaction(tx, {
          summary: `Farm: Claim reward`
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

  return { handleFarmStakerClaim, pendingTx };
};
