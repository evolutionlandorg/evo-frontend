// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getRpcInfoByLandId } from 'config';
import sample from 'lodash/sample';
import { SUPPORTED_LANDS_INDEX } from 'types';

const getNodeUrl = (landId: SUPPORTED_LANDS_INDEX) => {
  const network = getRpcInfoByLandId(landId);

  return sample(network?.rpcUrls) || '';
};

export default getNodeUrl;
