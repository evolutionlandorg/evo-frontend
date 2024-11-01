// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type Token = {
  address: string;
  name?: string;
  symbol?: string;
  decimals: number;
  chainId: number;
};

export type TokenAmount = {
  address: string;
  name?: string;
  symbol?: string;
  decimals: number;
  chainId: number;
  amount: string;
};
