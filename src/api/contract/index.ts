// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { setMaxListeners } from 'process';

let a = 1;

export const setA = () => {
  a = 2;
};

export const test = (): void => {
  console.log('This is contract index');
};
