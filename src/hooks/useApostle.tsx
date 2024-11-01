// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from 'ethers';
import { BIG_ZERO } from 'utils/bigNumber';
import { Element, SUPPORTED_LANDS_INDEX } from 'types';
import { extendLandId, responseCallback } from 'utils';
import { bundleApi } from 'api';
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

export const useApostleCurrentPrice = (landId: SUPPORTED_LANDS_INDEX, tokenId: string): BigNumber => {
  const { library } = useActiveWeb3React(landId);
  const { fastRefresh } = useRefresh();
  const [currentPrice, setCurrentPrice] = useState<BigNumber>(BIG_ZERO);

  useEffect(() => {
    async function fetchCurrentPrice() {
      const price = await bundleApi[landId].apostle.apostleGetCurrentPriceByTokenId(extendLandId(landId), library, tokenId);
      setCurrentPrice(new BigNumber(price));
    }

    fetchCurrentPrice();
  }, [fastRefresh, landId, library, tokenId]);

  return currentPrice;
};

export const useApostleCurrentSiringPrice = (landId: SUPPORTED_LANDS_INDEX, tokenId: string): BigNumber => {
  const { library } = useActiveWeb3React(landId);
  const { fastRefresh } = useRefresh();
  const [currentPrice, setCurrentPrice] = useState<BigNumber>(BIG_ZERO);

  useEffect(() => {
    async function fetchCurrentPrice() {
      const price = await bundleApi[landId].apostle.apostleGetCurrentSiringPriceByTokenId(extendLandId(landId), library, tokenId);
      setCurrentPrice(new BigNumber(price));
    }

    fetchCurrentPrice();
  }, [fastRefresh, landId, library, tokenId]);

  return currentPrice;
};

export const useApostleAutoBreedFee = (landId: SUPPORTED_LANDS_INDEX): BigNumber => {
  const { library } = useActiveWeb3React(landId);
  const [fee, setFee] = useState<BigNumber>(BIG_ZERO);

  useEffect(() => {
    async function fetchFee() {
      const price = await bundleApi[landId].apostle.apostleGetAutoBreedFee(extendLandId(landId), library);
      setFee(new BigNumber(price));
    }

    fetchFee();
  }, [landId, library]);

  return fee;
};

export const useApostleBidWithToken = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, referal = '', price: string) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleApostleBidWithToken = useCallback(async () => {
    try {
      setPendingTx(true);
      console.info('landBidWithToken:', tokenId, referal, price);

      const tx = await bundleApi[landId].apostle.apostleBidWithToken(extendLandId(landId), library.getSigner(), tokenId, referal, price);

      addTransaction(tx, {
        summary: `MarketPlace: Bid apostle`
      });

      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, library, price, referal, toastError, tokenId]);

  return { handleApostleBidWithToken, pendingTx };
};

export const useApostleAskWithToken = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library, account } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleApostleAskWithToken = useCallback(
    async (tokenId: string, startPrice: EthersBigNumber, endPrice: EthersBigNumber, duration: string, callback?: CallbackHandler) => {
      try {
        setPendingTx(true);

        const tx = await bundleApi[landId].apostle.apostleAskWithToken(extendLandId(landId), library.getSigner(), account, tokenId, startPrice.toString(), endPrice.toString(), duration);

        addTransaction(tx, {
          summary: `MarketPlace: Ask apostle`
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

  return { handleApostleAskWithToken, pendingTx };
};

export const useApostleCancelAskWithToken = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleApostleCancelAskWithToken = useCallback(async () => {
    try {
      setPendingTx(true);
      const tx = await bundleApi[landId].apostle.apostleCancelAskWithToken(extendLandId(landId), library.getSigner(), tokenId);
      addTransaction(tx, {
        summary: `MarketPlace: Cancel ask apostle`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, library, toastError, tokenId]);

  return { handleApostleCancelAskWithToken, pendingTx };
};

export const useApostleHire = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleApostleHire = useCallback(
    async (resourceAddress: string, tokenId: string, price: EthersBigNumber, duration: string, callback?: CallbackHandler) => {
      try {
        setPendingTx(true);

        const tx = await bundleApi[landId].apostle.apostleHire(extendLandId(landId), library.getSigner(), resourceAddress, tokenId, price.toString(), duration);
        addTransaction(tx, {
          summary: `MarketPlace: Rent apostle`
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

  return { handleApostleHire, pendingTx };
};

export const useApostleHireBid = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleApostleHireBid = useCallback(
    async (tokenId: string, amountMax: EthersBigNumber, callback?: CallbackHandler) => {
      try {
        setPendingTx(true);

        const tx = await bundleApi[landId].apostle.apostleHireBid(extendLandId(landId), library.getSigner(), tokenId, amountMax.toString());
        addTransaction(tx, {
          summary: `MarketPlace: Rent bid apostle`
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

  return { handleApostleHireBid, pendingTx };
};

export const useApostleCancelHire = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleApostleCancelHire = useCallback(async () => {
    try {
      setPendingTx(true);

      const tx = await bundleApi[landId].apostle.apostleCancelHire(extendLandId(landId), library.getSigner(), tokenId);
      addTransaction(tx, {
        summary: `MarketPlace: Cancel hire`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, library, toastError, tokenId]);

  return { handleApostleCancelHire, pendingTx };
};

export const useApostleBreed = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, targetTokenId: string, price: EthersBigNumber, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleApostleBreed = useCallback(async () => {
    try {
      setPendingTx(true);

      const tx = await bundleApi[landId].apostle.apostleBreed(extendLandId(landId), library.getSigner(), tokenId, targetTokenId, price.toString());
      addTransaction(tx, {
        summary: `MarketPlace: Breed an apostle`
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
  }, [addTransaction, landId, library, price, targetTokenId, toastError, tokenId, callback]);

  return { handleApostleBreed, pendingTx };
};

export const useApostleBreedBid = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, targetTokenId: string, amountMax: EthersBigNumber, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);

  const handleApostleBreedBid = useCallback(async () => {
    try {
      setPendingTx(true);
      const tx = await bundleApi[landId].apostle.apostleBreedBid(extendLandId(landId), library.getSigner(), tokenId, targetTokenId, amountMax.toString());
      addTransaction(tx, {
        summary: `MarketPlace: Breed an apostle`
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
  }, [addTransaction, amountMax, callback, landId, library, targetTokenId, toastError, tokenId]);

  return { handleApostleBreedBid, pendingTx };
};

export const useApostleBreedAsk = (landId: SUPPORTED_LANDS_INDEX) => {
  const { library, account } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleApostleBreedAsk = useCallback(
    async (tokenId: string, startPrice: EthersBigNumber, endPrice: EthersBigNumber, duration: string, callback?: CallbackHandler) => {
      try {
        setPendingTx(true);

        const tx = await bundleApi[landId].apostle.apostleBreedAsk(extendLandId(landId), library.getSigner(), account, tokenId, startPrice.toString(), endPrice.toString(), duration);
        addTransaction(tx, {
          summary: `MarketPlace: Breed ask apostle`
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

  return { handleApostleBreedAsk, pendingTx };
};

export const useApostleCancelBreedAsk = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleApostleCancelBreedAsk = useCallback(async () => {
    try {
      setPendingTx(true);
      const tx = await bundleApi[landId].apostle.apostleCancelBreedAsk(extendLandId(landId), library.getSigner(), tokenId);
      addTransaction(tx, {
        summary: `MarketPlace: Cancel breed ask apostle`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, library, toastError, tokenId]);

  return { handleApostleCancelBreedAsk, pendingTx };
};

export const useApostleBorn = (landId: SUPPORTED_LANDS_INDEX, motherTokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleApostleBorn = useCallback(async () => {
    try {
      setPendingTx(true);

      const tx = await bundleApi[landId].apostle.apostleBorn(extendLandId(landId), library.getSigner(), motherTokenId);
      addTransaction(tx, {
        summary: `MarketPlace: Apostle born`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, library, motherTokenId, toastError]);

  return { handleApostleBorn, pendingTx };
};

export const useApostleBornWithEnhance = (landId: SUPPORTED_LANDS_INDEX, motherTokenId: string, element: Element, level: number, levelUnitPrice: EthersBigNumber, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleApostleBornWithEnhance = useCallback(async () => {
    try {
      setPendingTx(true);

      const tx = await bundleApi[landId].apostle.apostleBornAndEnhance(extendLandId(landId), library.getSigner(), motherTokenId, element, level, levelUnitPrice.toString());
      addTransaction(tx, {
        summary: `MarketPlace: Apostle born with enhance`
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
  }, [addTransaction, callback, element, landId, level, levelUnitPrice, library, motherTokenId, toastError]);

  return { handleApostleBornWithEnhance, pendingTx };
};

export const useApostleClaim = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleApostleClaim = useCallback(async () => {
    try {
      setPendingTx(true);

      const tx = await bundleApi[landId].apostle.apostleClaim(extendLandId(landId), library.getSigner(), tokenId);
      addTransaction(tx, {
        summary: `MarketPlace: Claim an apostle`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, library, toastError, tokenId]);

  return { handleApostleClaim, pendingTx };
};

export const useApostleTransfer = (landId: SUPPORTED_LANDS_INDEX, from: string, to: string, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastSuccess, toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleApostleTransfer = useCallback(async () => {
    try {
      setPendingTx(true);

      const tx = await bundleApi[landId].apostle.apostleTransfer(extendLandId(landId), library.getSigner(), from, to, tokenId);
      addTransaction(tx, {
        summary: `MarketPlace: Transfer an apostle`
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
  }, [addTransaction, callback, from, landId, library, to, toastError, tokenId]);

  return { handleApostleTransfer, pendingTx };
};

export const useApostleWorking = (landId: SUPPORTED_LANDS_INDEX, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleApostleWorking = useCallback(
    async (tokenId: string, landTokenId: string, elementContractAddress: string) => {
      try {
        setPendingTx(true);

        const tx = await bundleApi[landId].apostle.apostleWork(extendLandId(landId), library.getSigner(), tokenId, landTokenId, elementContractAddress);
        addTransaction(tx, {
          summary: `MarketPlace: Apostle working`
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

  return { handleApostleWorking, pendingTx };
};

export const useApostleStopWorking = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleApostleStopWorking = useCallback(async () => {
    try {
      setPendingTx(true);

      const tx = await bundleApi[landId].apostle.apostleStopWork(extendLandId(landId), library.getSigner(), tokenId);
      addTransaction(tx, {
        summary: `MarketPlace: Stop apostle working`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, library, toastError, tokenId]);

  return { handleApostleStopWorking, pendingTx };
};

export const useApostleClaimHire = (landId: SUPPORTED_LANDS_INDEX, tokenId: string, callback?: CallbackHandler) => {
  const { library } = useActiveWeb3React(landId);
  const [pendingTx, setPendingTx] = useState(false);
  const { toastError } = useToast();
  const addTransaction = useTransactionAdder(landId);
  const handleApostleClaimHire = useCallback(async () => {
    try {
      setPendingTx(true);

      const tx = await bundleApi[landId].apostle.apostleClaimHire(extendLandId(landId), library.getSigner(), tokenId);
      addTransaction(tx, {
        summary: `MarketPlace: Claim apostle`
      });
      responseCallback(tx, () => setPendingTx(false));
    } catch (e) {
      console.error(e);
      setPendingTx(false);
      toastError('Error', 'Please try again. Confirm the transaction and make sure you are paying enough gas!');
    }
  }, [addTransaction, landId, library, toastError, tokenId]);

  return { handleApostleClaimHire, pendingTx };
};
