// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { $get } from 'utils/agent';
import { useEffect, useState } from 'react';
import { remove0x } from 'api/utils';
import { env } from 'config';
import useRefresh from 'hooks/useRefresh';
import { StatusResponse, Apostle, ApostleAttributes, ApostleAuction, RequestBareProps } from './types';
import { FETCH_ERROR } from './constants';

export interface ApostleDetail extends Apostle {
  attributes: ApostleAttributes;
  auction: ApostleAuction;
}

export interface GetApostleResponse extends StatusResponse {
  data?: ApostleDetail;
}

export interface GetApostleRequest extends RequestBareProps {
  tokenId: string;
}

export const useGetApostle = ({ landId, tokenId }: GetApostleRequest) => {
  const { slowRefresh } = useRefresh();

  const [data, setData] = useState<ApostleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [tokenId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiNetwork = env[landId].BACKEND_API_NETWORK;
        const response = await $get('/api/apostle/info', { 'EVO-NETWORK': apiNetwork, token_id: remove0x(tokenId) });
        const responseData: GetApostleResponse = response;
        setData(responseData?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(FETCH_ERROR, error);
        setIsLoading(false);
      }
    };
    if (tokenId) {
      fetchData();
    }
  }, [landId, setData, tokenId, slowRefresh]);

  return { data, isLoading };
};
