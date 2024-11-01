// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { bundleApi } from 'api';
import { BIG_ZERO } from 'utils/bigNumber';
import { useWeb3React } from '@web3-react/core';
import { simpleRpcProviderByLandId } from 'utils/providers';
import { SUPPORTED_LANDS_INDEX } from 'types';
import useActiveWeb3React from './useActiveWeb3React';
import useLastUpdated from './useLastUpdated';
import useRefresh from './useRefresh';

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export const useTokenBalance = (landId: SUPPORTED_LANDS_INDEX, contractAddress: string, account: string): BigNumber => {
  const { library } = useActiveWeb3React(landId);
  const [balance, setBalance] = useState<BigNumber>(BIG_ZERO);
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    async function fetchBalance() {
      const _balance = await bundleApi[landId].erc20.erc20BalanceOf(library, contractAddress, account);
      setBalance(new BigNumber(_balance));
    }

    if (contractAddress && account && library) {
      fetchBalance();
    } else {
      setBalance(new BigNumber(0));
    }
  }, [account, contractAddress, landId, library, slowRefresh]);

  return balance;
};

export const useGetEtherBalance = (landId: SUPPORTED_LANDS_INDEX) => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [balance, setBalance] = useState(EthersBigNumber.from(0));
  const { account } = useWeb3React();
  const { lastUpdated, setLastUpdated } = useLastUpdated();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await simpleRpcProviderByLandId(landId).getBalance(account);
        setBalance(walletBalance);
        setFetchStatus(FetchStatus.SUCCESS);
      } catch {
        setFetchStatus(FetchStatus.FAILED);
      }
    };

    if (account) {
      fetchBalance();
    }
  }, [account, landId, lastUpdated, setBalance, setFetchStatus]);

  return { balance, fetchStatus, refresh: setLastUpdated };
};
