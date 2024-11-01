// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line import/no-cycle
import dev from './dev';
// eslint-disable-next-line import/no-cycle
import prod from './prod';

console.info('./env/index process.env.REACT_APP_CHAIN:', process.env.REACT_APP_CHAIN);

const env = process.env.REACT_APP_CHAIN === 'mainnet' ? prod : dev;
export default env;
