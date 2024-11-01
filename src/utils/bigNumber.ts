// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

export const BIG_ZERO = new BigNumber(0);
export const BIG_ONE = new BigNumber(1);
export const BIG_NINE = new BigNumber(9);
export const BIG_TEN = new BigNumber(10);
export const BIG_MAX_UINT256 = new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

export const ETHERS_BIG_ZERO = ethers.BigNumber.from(0);
export const ETHERS_BIG_ONE = ethers.BigNumber.from(1);
export const ETHERS_BIG_NINE = ethers.BigNumber.from(9);
export const ETHERS_BIG_TEN = ethers.BigNumber.from(10);
export const ETHERS_BIG_MAX_UINT256 = new BigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');

export const ethersToBigNumber = (ethersBn: ethers.BigNumber): BigNumber => new BigNumber(ethersBn.toString());
export const BigNumberToEthers = (Bn: BigNumber): ethers.BigNumber => ethers.BigNumber.from(Bn.toString());

export const ethersToSerializedBigNumber = (ethersBn: ethers.BigNumber): SerializedBigNumber => ethersToBigNumber(ethersBn).toJSON();
