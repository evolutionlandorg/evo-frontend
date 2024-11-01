// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { $get } from 'utils/agent';
import { useCallback, useEffect, useState } from 'react';
import { remove0x } from 'api/utils';
import { StatusResponse, Land, LandAuction, LandRecord, LandResource } from './types';
import { FETCH_ERROR } from './constants';
import useRefresh from '../useRefresh';

export interface LandDetail {
  land_data?: Land;
  resource?: LandResource;
  auction?: LandAuction;
  record?: LandRecord[];
}
export interface GetLandResponse extends StatusResponse {
  data?: LandDetail;
}

export interface GetLandRequest {
  tokenId: string;
}

export const useGetLand = ({ tokenId }: GetLandRequest) => {
  const { slowRefresh } = useRefresh();

  const [data, setData] = useState<LandDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [tokenId]);

  const fetchData = useCallback(async () => {
    try {
      const response = await $get('/api/land', { token_id: remove0x(tokenId) });

      const responseData: GetLandResponse = response;
      setData(responseData?.data);
      setIsLoading(false);
    } catch (error) {
      console.error(FETCH_ERROR, error);
      setIsLoading(false);
    }
  }, [tokenId]);

  useEffect(() => {
    if (tokenId) {
      fetchData();
    }
  }, [setData, tokenId, slowRefresh, fetchData]);

  return { fetchData, data, isLoading };
};
