// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SUPPORTED_LANDS_INDEX } from 'types';
import ethersApi from './ether';
import tronwebApi from './tronweb';

type BundleApiType = {
  [landId in SUPPORTED_LANDS_INDEX]: any;
};

const BundleApi = {
  '1': ethersApi,
  // '2': tronwebApi,
  '2': tronwebApi,
  '3': ethersApi,
  '4': ethersApi,
  '5': ethersApi
};

export default BundleApi;
