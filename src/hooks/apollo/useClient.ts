// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getIsSupportByModuleName } from 'config';
import { crabClient, crabTestClient, dummyClient, mumbaiClient, polygonClient } from 'config/apollo/client';
import { useMemo } from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';

export function useClient(landId: SUPPORTED_LANDS_INDEX) {
  const client = useMemo(() => {
    if (process.env.REACT_APP_CHAIN === 'mainnet') {
      switch (landId) {
        case '3':
          return crabClient;
        case '5':
          return polygonClient;
        default:
          return dummyClient;
      }
    }

    switch (landId) {
      case '3':
        return crabTestClient;
      case '5':
        return mumbaiClient;
      default:
        return dummyClient;
    }
  }, [landId]);

  return {
    client,
    supportedTheGraph: getIsSupportByModuleName(landId, 'THE_GRAPH')
  };
}
