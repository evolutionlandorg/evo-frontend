// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { $get } from 'utils/agent';
import { useEffect, useState } from 'react';
import { env } from 'config';
import useRefresh from 'hooks/useRefresh';
import { StatusResponse, LandRank, RequestBareProps } from './types';
import { FETCH_ERROR } from './constants';

export interface LandRankResponse extends StatusResponse {
  data?: LandRank[];
}

export const useGetLandRank = ({ landId }: RequestBareProps) => {
  const { slowRefresh } = useRefresh();

  const [data, setData] = useState<LandRank[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiNetwork = env[landId].BACKEND_API_NETWORK;
        const response = await $get('/api/land/rank', { 'EVO-NETWORK': apiNetwork });
        const responseData: LandRankResponse = response;
        setData(responseData?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(FETCH_ERROR, error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [landId, setData, slowRefresh]);

  return { data, isLoading };
};
