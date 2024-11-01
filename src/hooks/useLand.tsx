// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { bundleApi } from 'api';
import { BIG_ZERO } from 'utils/bigNumber';
import { extendLandId, responseCallback } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useTransactionAdder } from 'store/transactions/hooks';
import { $post } from 'utils/agent';
import useRefresh from './useRefresh';
import useActiveWeb3React from './useActiveWeb3React';
import useToast from './useToast';
import { FETCH_ERROR } from './backendApi/constants';

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed'
}

export type CallbackHandler = () => void;

export const useLandCurrentPrice = (landId: SUPPORTED_LANDS_INDEX, tokenId: string): BigNumber => {
  const { library } = useActiveWeb3React(landId);
  const { fastRefresh } = useRefresh();
  const [currentPrice, setCurrentPrice] = useState<BigNumber>(BIG_ZERO);

  useEffect(() => {
    async function fetchCurrentPrice() {
      const price = await bundleApi[landId].land.landGetCurrentPriceByTokenId(extendLandId(landId), library, tokenId);
      setCurrentPrice(new BigNumber(price));
    }

    fetchCurrentPrice();
  }, [fastRefresh, landId, library, tokenId]);

  return currentPrice;
};

export const useLandTransfer = (landId: SUPPORTED_LANDS_INDEX, from: string, to: string, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleLandTransfer = useCallback(async () => {
    try {
      setPendingTx(true);
      const tx = await bundleApi[landId].apostle.apostleTransfer(extendLandId(landId), library.getSigner(), from, to, tokenId);
      addTransaction(tx, {
        summary: `MarketPalce: transfer a land`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, from, landId, library, to, toastError, tokenId]);

  return { handleLandTransfer, pendingTx };
};

export const useLandGetAvailableItemResources = (landId: SUPPORTED_LANDS_INDEX, drillTokenId: string): BigNumber[] => {
  const { library, chainId } = useActiveWeb3React(landId);
  const { fastRefresh } = useRefresh();
  const [resources, setResources] = useState<BigNumber[]>([BIG_ZERO, BIG_ZERO, BIG_ZERO, BIG_ZERO, BIG_ZERO]);

  const contractAddress = bundleApi[landId].getAddressByName(extendLandId(landId), 'OBJECTOWNERSHIP');
  const gold = bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_GOLD');
  const wood = bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_WOOD');
  const water = bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_WATER');
  const fire = bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_FIRE');
  const soil = bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_SOIL');
  const resourcesContractAddress = useMemo(() => [gold, wood, water, fire, soil], [fire, gold, soil, water, wood]);

  useEffect(() => {
    async function fetchCurrentPrice() {
      const result = await bundleApi[landId].land.landGetAvailableItemResources(extendLandId(landId), library, contractAddress, drillTokenId, resourcesContractAddress);
      setResources(result.map((item) => new BigNumber(item)));
    }

    fetchCurrentPrice();
  }, [contractAddress, drillTokenId, fastRefresh, landId, library, resourcesContractAddress]);

  return resources;
};

export const useLandGetAvailableResources = (landId: SUPPORTED_LANDS_INDEX, tokenTokenId: string): BigNumber[] => {
  const { library, chainId } = useActiveWeb3React(landId);
  const { slowRefresh } = useRefresh();
  const [resources, setResources] = useState<BigNumber[]>([BIG_ZERO, BIG_ZERO, BIG_ZERO, BIG_ZERO, BIG_ZERO]);

  const gold = bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_GOLD');
  const wood = bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_WOOD');
  const water = bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_WATER');
  const fire = bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_FIRE');
  const soil = bundleApi[landId].getAddressByName(extendLandId(landId), 'ELEMENT_SOIL');
  const resourcesContractAddress = useMemo(() => [gold, wood, water, fire, soil], [fire, gold, soil, water, wood]);

  useEffect(() => {
    async function fetchCurrentPrice() {
      let result = await bundleApi[landId].land.landGetAvailableResources(extendLandId(landId), library, tokenTokenId, resourcesContractAddress);
      if (!result || result.length === 0) {
        result = ['0', '0', '0', '0', '0'];
      }
      setResources(result.map((item) => new BigNumber(item)));
    }

    fetchCurrentPrice();
  }, [slowRefresh, library, resourcesContractAddress, tokenTokenId, landId]);

  return resources;
};

export const useLandBidWithToken = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, referal = '', price: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleLandBidWithToken = useCallback(async () => {
    try {
      setPendingTx(true);
      console.info('landBidWithToken:', tokenId, referal, price);

      const tx = await bundleApi[landId].land.landBidWithToken(extendLandId(landId), library.getSigner(), tokenId, referal, price);

      addTransaction(tx, {
        summary: `MarketPalce: Bid land`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, library, price, referal, toastError, tokenId]);

  return { handleLandBidWithToken, pendingTx };
};

export const useLandAskWithToken = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library, account } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleLandAskWithToken = useCallback(
    async (tokenId: string, startPrice: EthersBigNumber, endPrice: EthersBigNumber, duration: string, callback?: CallbackHandler) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].land.landAskWithToken(extendLandId(landId), library.getSigner(), account, tokenId, startPrice.toString(), endPrice.toString(), duration);
        addTransaction(tx, {
          summary: `MarketPalce: Ask land`
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
    [account, addTransaction, landId, library, toastError]
  );

  return { handleLandAskWithToken, pendingTx };
};

export const useLandCancelAskWithToken = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleLandCancelAskWithToken = useCallback(async () => {
    try {
      setPendingTx(true);
      const tx = await bundleApi[landId].land.landCancelAskWithToken(extendLandId(landId), library.getSigner(), tokenId);
      addTransaction(tx, {
        summary: `MarketPalce: Cancel ask land`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, library, toastError, tokenId]);

  return { handleLandCancelAskWithToken, pendingTx };
};

export const useLandBatchClaimResource = (landId: SUPPORTED_LANDS_INDEX, landTokenIds: string[], callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleLandBatchClaimResource = useCallback(async () => {
    try {
      setPendingTx(true);
      const tx = await bundleApi[landId].land.landBatchClaimLandResource(extendLandId(landId), library.getSigner(), landTokenIds);
      addTransaction(tx, {
        summary: `Land: Batch claim resources`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, landTokenIds, library, toastError]);

  return { handleLandBatchClaimResource, pendingTx };
};

export const useLandClaimResource = (landId: SUPPORTED_LANDS_INDEX, landTokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleLandClaimResource = useCallback(async () => {
    try {
      setPendingTx(true);
      // @ts-ignore
      const tx = await bundleApi[2].land.landClaimLandResource(extendLandId(landId), library.getSigner(), landTokenId);
      addTransaction(tx, {
        summary: `Land: Claim land resources`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, landTokenId, library, toastError]);

  return { handleLandClaimResource, pendingTx };
};

export const useLandClaimItemResource = (landId: SUPPORTED_LANDS_INDEX, drillContractAddress: string, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleLandClaimItemResource = useCallback(async () => {
    try {
      setPendingTx(true);

      const tx = await bundleApi[landId].land.landClaimItemResource(extendLandId(landId), library.getSigner(), drillContractAddress, tokenId);
      addTransaction(tx, {
        summary: `Land: Claim item resources`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, drillContractAddress, landId, library, toastError, tokenId]);

  return { handleLandClaimItemResource, pendingTx };
};

export const useLandBatchClaimItemResource = (landId: SUPPORTED_LANDS_INDEX, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleLandClaimItemResource = useCallback(
    async (drillContractAddress: string[], tokenIds: string[]) => {
      try {
        setPendingTx(true);
        const tx = await bundleApi[landId].land.landBatchClaimItemResource(extendLandId(landId), library.getSigner(), drillContractAddress, tokenIds);
        addTransaction(tx, {
          summary: `Land: Batch claim item resources`
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

  return { handleLandClaimItemResource, pendingTx };
};

export const useLandClaimLandAsset = (landId: SUPPORTED_LANDS_INDEX, landTokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleLandClaimClaimAsset = useCallback(async () => {
    try {
      setPendingTx(true);

      const tx = await bundleApi[landId].land.landClaimLand(extendLandId(landId), library.getSigner(), landTokenId);
      addTransaction(tx, {
        summary: `Land: Claim a land`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, landTokenId, library, toastError]);

  return { handleLandClaimClaimAsset, pendingTx };
};

export const useUpdateLandInfo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateLandInfo = useCallback(async (formData) => {
    try {
      setIsLoading(true);
      const response = await $post('/api/land_info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsLoading(false);
      return response;
    } catch (error) {
      console.error(FETCH_ERROR, error);
      setIsLoading(false);
      return { code: -1, detail: error.toString() };
    }
  }, []);

  return { updateLandInfo, isLoading };
};
