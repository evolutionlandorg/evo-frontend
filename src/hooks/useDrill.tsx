// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';
import { bundleApi } from 'api';
import { extendLandId, responseCallback } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useTransactionAdder } from 'store/transactions/hooks';
import { useIllustratedList } from 'store/illustrated/hooks';
import { getIllustratedById } from 'pages/Drill/utils';
import dayjs from 'dayjs';
import { isNull } from 'lodash';
import useToast from './useToast';
import useActiveWeb3React from './useActiveWeb3React';

export type CallbackHandler = () => void;

export const useDrillTransfer = (landId: SUPPORTED_LANDS_INDEX, from: string, to: string, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleDrillTransfer = useCallback(async () => {
    try {
      setPendingTx(true);
      const tx = await bundleApi[landId].drill.drillTransfer(extendLandId(landId), library.getSigner(), from, to, tokenId);
      addTransaction(tx, {
        summary: `MarketPlace: Transfer drill`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, from, landId, library, to, toastError, tokenId]);

  return { handleDrillTransfer, pendingTx };
};

export const useDrillStopWork = (landId: SUPPORTED_LANDS_INDEX, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleDrillStopWork = useCallback(
    async (tokenId: string, slotIndex: number) => {
      try {
        setPendingTx(true);

        const tx = await bundleApi[landId].drill.drillStopWork(extendLandId(landId), library.getSigner(), tokenId, slotIndex);
        addTransaction(tx, {
          summary: `MarketPlace: Divest a drill`
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

  return { handleDrillStopWork, pendingTx };
};

export const useDrillWork = (landId: SUPPORTED_LANDS_INDEX, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleDrillWork = useCallback(
    async (landTokenId, drillContractAddress, drillTokenId, resourceContractAddress, slotIndex: number) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].drill.drillWork(extendLandId(landId), library.getSigner(), landTokenId, drillContractAddress, drillTokenId, resourceContractAddress, slotIndex);
        addTransaction(tx, {
          summary: `MarketPlace: Equip a drill`
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

  return { handleDrillWork, pendingTx };
};

// equipTime in seconds
export const useDrillInCooldown = (equipTime: number, formulaId: number) => {
  const [illustratedList, fetchIllustratedList] = useIllustratedList();
  const illustrated = getIllustratedById(illustratedList, formulaId);

  if (isNull(formulaId) || !illustrated) {
    return { protectionPeriodEndTime: dayjs(0), isInCooldown: false };
  }

  const now = dayjs();
  const equip = dayjs(equipTime * 1000);

  const protectionPeriodEndTime = equip.add(illustrated.protection_period * 3600 * 24, 'second');
  return { protectionPeriodEndTime, isInCooldown: protectionPeriodEndTime.isAfter(now) };
};
