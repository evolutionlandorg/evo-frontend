// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import { calculateActionPriceMargin } from 'utils/price';
import { ETHERS_BIG_ZERO } from 'utils/bigNumber';

export const useBidPrice = (startPrice: string, endPrice: string, currentPrice: string, duration: number, slippageTime: number): string => {
  const [price, setPrice] = useState<EthersBigNumber>(ETHERS_BIG_ZERO);

  useEffect(() => {
    async function calculate() {
      let bidPrice = EthersBigNumber.from(0);
      const marginPrice = calculateActionPriceMargin(EthersBigNumber.from(startPrice), EthersBigNumber.from(endPrice), duration, slippageTime);
      if (EthersBigNumber.from(startPrice).lt(EthersBigNumber.from(endPrice))) {
        bidPrice = EthersBigNumber.from(currentPrice).add(EthersBigNumber.from(marginPrice));
        setPrice(bidPrice.lte(endPrice) ? bidPrice : EthersBigNumber.from(endPrice));
      } else {
        bidPrice = EthersBigNumber.from(currentPrice);
        setPrice(bidPrice.lte(endPrice) ? EthersBigNumber.from(endPrice) : bidPrice);
      }
    }

    calculate();
  }, [currentPrice, duration, endPrice, slippageTime, startPrice]);

  return price.toString();
};
