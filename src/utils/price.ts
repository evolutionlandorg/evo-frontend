// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';

export function calculateActionPriceMargin(startPrice: EthersBigNumber, endPrice: EthersBigNumber, duration: number, slippageTime: number): EthersBigNumber {
  // 10000 -> 100
  if (startPrice.gt(endPrice)) {
    const spreadPrice = startPrice.sub(endPrice);
    const marginPrice = spreadPrice.mul(EthersBigNumber.from(10000)).div(EthersBigNumber.from(duration)).mul(EthersBigNumber.from(slippageTime)).div(EthersBigNumber.from(10000));
    return marginPrice;
  }

  // 100 -> 10000
  if (endPrice.gt(startPrice)) {
    const spreadPrice = endPrice.sub(startPrice);
    const marginPrice = spreadPrice.mul(EthersBigNumber.from(10000)).div(EthersBigNumber.from(duration)).mul(EthersBigNumber.from(slippageTime)).div(EthersBigNumber.from(10000));
    return marginPrice;
  }

  // 10000 -> 10000
  return EthersBigNumber.from(0);
}
