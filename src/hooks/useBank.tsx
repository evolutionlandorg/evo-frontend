// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { CompactToken, CompactTokenWithAmount, DerivedMintInfo, DerivedBurnInfo, Pair } from '@evolutionland/evolution-js/lib/api/ethers';
import { bundleApi } from 'api';
import { BIG_ZERO } from 'utils/bigNumber';
import { extendLandId, responseCallback } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useTransactionAdder } from 'store/transactions/hooks';
import useActiveWeb3React from './useActiveWeb3React';
import useToast from './useToast';

export const useBankBuyRING = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleUniswapBuyRING = useCallback(
    async (value: EthersBigNumber) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].uniswap.uniswapBuyRING(extendLandId(landId), library.getSigner(), value.toString());
        addTransaction(tx, {
          summary: `Gringotts: Buy RING`
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

  return { handleUniswapBuyRING, pendingTx };
};

export const useBankSellRING = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleUniswapSellRING = useCallback(
    async (value: EthersBigNumber) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].uniswap.uniswapSellRING(extendLandId(landId), library.getSigner(), value.toString());
        addTransaction(tx, {
          summary: `Gringotts: Sell RING`
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

  return { handleUniswapSellRING, pendingTx };
};

export const useBankUniswapAddETHLiquidity = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library, account } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleUniswapAddETHLiquidity = useCallback(
    async (tokenA: CompactTokenWithAmount, tokenB: CompactTokenWithAmount) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].uniswap.uniswapAddETHLiquidity(extendLandId(landId), library.getSigner(), tokenA, tokenB, account, 50);
        addTransaction(tx, {
          summary: `Gringotts: Add native Token liquidity`
        });
        responseCallback(tx, () => setPendingTx(false));
      } catch (e) {
        console.error(e);
        setPendingTx(false);
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
      }
    },
    [account, addTransaction, landId, library, toastError]
  );

  return { handleUniswapAddETHLiquidity, pendingTx };
};

export const useBankUniswapAddLiquidity = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library, account } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleUniswapAddLiquidity = useCallback(
    async (tokenA: CompactTokenWithAmount, tokenB: CompactTokenWithAmount) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].uniswap.uniswapAddLiquidity(extendLandId(landId), library.getSigner(), tokenA, tokenB, account, 50);
        addTransaction(tx, {
          summary: `Gringotts: Add liquidity`
        });
        responseCallback(tx, () => setPendingTx(false));
      } catch (e) {
        console.error(e);
        setPendingTx(false);
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
      }
    },
    [account, addTransaction, landId, library, toastError]
  );

  return { handleUniswapAddLiquidity, pendingTx };
};

export const useBankUniswapRemoveLiquidity = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library, account } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleUniswapRemoveLiquidity = useCallback(
    async (tokenA: CompactToken, tokenB: CompactToken, liquidityValue: EthersBigNumber) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].uniswap.uniswapRemoveLiquidity(extendLandId(landId), library.getSigner(), tokenA, tokenB, liquidityValue.toString(), account, 50);
        addTransaction(tx, {
          summary: `Gringotts: Remove liquidity`
        });
        responseCallback(tx, () => setPendingTx(false));
      } catch (e) {
        console.error(e);
        setPendingTx(false);
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
      }
    },
    [account, addTransaction, landId, library, toastError]
  );

  return { handleUniswapRemoveLiquidity, pendingTx };
};

export const useBankUniswapRemoveETHLiquidity = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library, account } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleUniswapRemoveETHLiquidity = useCallback(
    async (tokenA: CompactToken, tokenB: CompactToken, liquidityValue: EthersBigNumber) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].uniswap.uniswapRemoveETHLiquidity(extendLandId(landId), library.getSigner(), tokenA, tokenB, liquidityValue.toString(), account, 50);
        addTransaction(tx, {
          summary: `Gringotts: Remove native Token liquidity`
        });
        responseCallback(tx, () => setPendingTx(false));
      } catch (e) {
        console.error(e);
        setPendingTx(false);
        toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
      }
    },
    [account, addTransaction, landId, library, toastError]
  );

  return { handleUniswapRemoveETHLiquidity, pendingTx };
};

export const useBankUniswapEthToTokenOutputPrice = (landId: SUPPORTED_LANDS_INDEX, token: CompactToken, tokenBought: string) => {
  const { library } = useActiveWeb3React(landId);
  const [price, setPrice] = useState({
    price: BIG_ZERO,
    pay: BIG_ZERO
  });
  useEffect(() => {
    async function fetchPrice() {
      try {
        const result = await bundleApi[landId].uniswap.uniswapEthToTokenOutputPrice(extendLandId(landId), library, token, tokenBought);
        setPrice({
          price: new BigNumber(result[0]),
          pay: new BigNumber(result[1])
        });
      } catch (e) {
        console.error('useBankUniswapEthToTokenOutputPrice', e);
        setPrice({
          price: BIG_ZERO,
          pay: BIG_ZERO
        });
      }
    }

    if (token && tokenBought && token.address) {
      fetchPrice();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, token.address, token.decimals, tokenBought]);

  return price;
};

export const useBankUniswapTokenToEthInputPrice = (landId: SUPPORTED_LANDS_INDEX, token: CompactToken, tokenBought: string) => {
  const { library } = useActiveWeb3React(landId);
  const [price, setPrice] = useState({
    price: BIG_ZERO,
    pay: BIG_ZERO
  });
  useEffect(() => {
    async function fetchPrice() {
      try {
        const result = await bundleApi[landId].uniswap.uniswapTokenToEthInputPrice(extendLandId(landId), library, token, tokenBought);
        setPrice({
          price: new BigNumber(result[0]),
          pay: new BigNumber(result[1])
        });
      } catch (e) {
        console.error('useBankUniswapTokenToEthInputPrice', e);
        setPrice({
          price: BIG_ZERO,
          pay: BIG_ZERO
        });
      }
    }

    if (token && tokenBought && token.address) {
      fetchPrice();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, token.address, token.decimals, tokenBought]);

  return price;
};

export const useBankUniswapGetDerivedMintInfo = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library } = useActiveWeb3React(landId);
  const [info, setInfo] = useState<DerivedMintInfo>(null);
  const handleUniswapGetDerivedMintInfo = useCallback(
    async (tokenA: CompactTokenWithAmount, tokenB: CompactTokenWithAmount) => {
      async function fetchInfo() {
        try {
          const result = await bundleApi[landId].uniswap.uniswapGetDerivedMintInfo(library, tokenA, tokenB);
          setInfo(result);
        } catch (e) {
          console.error('useBankUniswapGetDerivedMintInfo', e);
          setInfo(null);
        }
      }

      if (tokenA && tokenB && tokenA.address && tokenB.address) {
        fetchInfo();
      }
    },
    [landId, library]
  );

  return { handleUniswapGetDerivedMintInfo, info };
};

export const useBankUniswapGetDerivedBurnInfo = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library } = useActiveWeb3React(landId);

  const [info, setInfo] = useState<DerivedBurnInfo>(null);

  const handleUniswapGetDerivedBurnInfo = useCallback(
    async (tokenA: CompactToken, tokenB: CompactToken, liquidityValue: EthersBigNumber, account: string) => {
      async function fetchInfo() {
        try {
          const result = await bundleApi[landId].uniswap.uniswapGetDerivedBurnInfo(library, tokenA, tokenB, liquidityValue, account);
          setInfo(result);
        } catch (e) {
          console.error('useBankUniswapGetDerivedBurnInfo', e);
          setInfo(null);
        }
      }

      if (tokenA && tokenB && tokenA.address && tokenB.address && liquidityValue && account) {
        fetchInfo();
      }
    },
    [landId, library]
  );

  return { handleUniswapGetDerivedBurnInfo, info };
};

export const useBankUniswapGetDerivedPairInfo = (landId: SUPPORTED_LANDS_INDEX, compactTokenA: CompactToken, compactTokenB: CompactToken): Pair => {
  const { library } = useActiveWeb3React(landId);
  const [info, setInfo] = useState<Pair>(null);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const _pair = await bundleApi[landId].uniswap.uniswapGetDerivedPairInfo(library, compactTokenA, compactTokenB);
        setInfo(_pair);
      } catch (error) {
        console.info('useBank', error);
      }
    }
    if (compactTokenA?.address && compactTokenB?.address) {
      fetchInfo();
    } else {
      setInfo(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compactTokenA?.address, compactTokenB?.address, library]);

  return info;
};
