// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { env } from 'config';
import { useCallback, useEffect, useState } from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { $get } from 'utils/agent';
import { StatusResponse } from './types';

interface GetServerTimeResponse extends StatusResponse {
  data: number;
}

export function useGetServerTime(landId: SUPPORTED_LANDS_INDEX) {
  const [isFetching, setIsFetching] = useState(false);
  const [serverTimestamp, setServerTimestamp] = useState(0);

  const query = useCallback(async () => {
    setIsFetching(true);

    try {
      const { data }: GetServerTimeResponse = await $get('/api/common/time', {
        'EVO-NETWORK': env[landId].BACKEND_API_NETWORK
      });

      setServerTimestamp(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }

    return 0;
  }, [landId]);

  useEffect(() => {
    query();
  }, [query]);

  return { serverTimestamp, query, isFetching };
}
