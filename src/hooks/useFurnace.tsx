// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { bundleApi } from 'api';
import { BIG_ZERO } from 'utils/bigNumber';
import { extendLandId, responseCallback } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useTransactionAdder } from 'store/transactions/hooks';
import { OperationType } from 'store/transactions/reducer';
import useActiveWeb3React from './useActiveWeb3React';
import useToast from './useToast';

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export type CallbackHandler = () => void;

export interface furnaceGetTreasurePriceResponse {
  priceGoldBox: BigNumber;
  priceSilverBox: BigNumber;
}

export const useFurnaceGetTreasurePrice = (landId: SUPPORTED_LANDS_INDEX): furnaceGetTreasurePriceResponse => {
  const { library } = useActiveWeb3React(landId);
  const [price, setPrice] = useState<furnaceGetTreasurePriceResponse>({
    priceGoldBox: BIG_ZERO,
    priceSilverBox: BIG_ZERO
  });

  useEffect(() => {
    async function fetchPrice() {
      const result = await bundleApi[landId].furnace.furnaceGetTreasurePrice(extendLandId(landId), library);
      setPrice({
        priceGoldBox: new BigNumber(result.priceGoldBox),
        priceSilverBox: new BigNumber(result.priceSilverBox)
      });
    }

    fetchPrice();
  }, [landId, library]);

  return price;
};

export const useFurnaceGetTreasureStatus = (landId: SUPPORTED_LANDS_INDEX, treasureTokenId: string): boolean => {
  const { library } = useActiveWeb3React(landId);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPrice() {
      const result = await bundleApi[landId].furnace.furnaceGetTreasureStatus(extendLandId(landId), library, treasureTokenId);
      setOpen(result);
    }

    fetchPrice();
  }, [landId, library, treasureTokenId]);

  return open;
};

export const useFurnaceBuyTreasure = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleFurnaceBuyTreasure = useCallback(
    async (to: string, goldBoxAmount: EthersBigNumber, silverBoxAmount: EthersBigNumber, cost: EthersBigNumber, callback?: CallbackHandler) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].furnace.furnaceBuyTreasure(extendLandId(landId), library.getSigner(), to, goldBoxAmount.toHexString(), silverBoxAmount.toHexString(), cost.toHexString());
        addTransaction(tx, {
          summary: `Furnace: Buy treasure`
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
    [addTransaction, landId, library, toastError]
  );

  return { handleFurnaceBuyTreasure, pendingTx };
};

export const useFurnaceOpenTreasure = (landId: SUPPORTED_LANDS_INDEX, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleFurnaceOpenTreasure = useCallback(
    async ({ boxIds, amounts, hashmessage, v, r, s }: { boxIds: string[]; amounts: string[]; hashmessage: string; v: number; r: string; s: string }) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].furnace.furnaceOpenTreasure(extendLandId(landId), library.getSigner(), {
          boxIds,
          amounts,
          hashmessage,
          v,
          r,
          s
        });
        addTransaction(tx, {
          summary: `Furnace: Open the treasure`
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

  return { handleFurnaceOpenTreasure, pendingTx };
};

export const useFurnaceEnchantProps = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleFurnaceEnchantProps = useCallback(
    async (furmulaIndex: number, majorTokenId: string, minorTokenAddress: string) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].furnace.furnaceEnchantProps(extendLandId(landId), library.getSigner(), furmulaIndex, majorTokenId, minorTokenAddress);
        addTransaction(tx, {
          summary: `Furnace: Enchant the props`,
          operation: OperationType.FurnaceUpgradeDrill
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

  return { handleFurnaceEnchantProps, pendingTx };
};

export const useFurnaceDisenchantProps = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleFurnaceDisenchantProps = useCallback(
    async (propsTokenId: string, depth: string) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].furnace.furnaceDisenchantProps(extendLandId(landId), library.getSigner(), propsTokenId, depth);
        addTransaction(tx, {
          summary: `Furnace: Disenchant the props`,
          operation: OperationType.FurnaceDismantleDrill
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

  return { handleFurnaceDisenchantProps, pendingTx };
};
