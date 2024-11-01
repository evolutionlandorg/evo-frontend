// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { env } from 'config';
import { useCallback, useEffect, useState } from 'react';
import { Metadata, SUPPORTED_LANDS_INDEX } from 'types';
import { $get } from 'utils/agent';
import { StatusResponse } from './types';

interface GetPVEMetadataResponse extends StatusResponse {
  data: Metadata;
}

export function useGetPVEMetadata(landId: SUPPORTED_LANDS_INDEX) {
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<Metadata>();

  const query = useCallback(async () => {
    setIsLoading(true);
    let res: GetPVEMetadataResponse = null;
    try {
      res = await $get('/api/pve/metadata', {
        'EVO-NETWORK': env[landId].BACKEND_API_NETWORK
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }

    setMetadata(res.data);
    return res;
  }, [landId]);

  useEffect(() => {
    query();
  }, [query]);

  return { metadata, query, isLoading };
}
