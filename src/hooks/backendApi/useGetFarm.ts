// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { $get, $post } from 'utils/agent';
import Continents, { ContinentDistrictEnum } from 'config/continents';
import { env } from 'config';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { StatusResponse, FarmAPR } from './types';
import { FETCH_ERROR } from './constants';

export interface GetFarmAPRResponse extends StatusResponse {
  data: FarmAPR;
}

export const useGetFarmAPR = ({ landId, address }: { landId: SUPPORTED_LANDS_INDEX; address: string }) => {
  const [data, setData] = useState<FarmAPR | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const apiNetwork = env[landId].BACKEND_API_NETWORK;
        const response: GetFarmAPRResponse = await $get('/api/farm/apr', { addr: address, 'EVO-NETWORK': apiNetwork });
        const responseData = response;
        setData(responseData?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(FETCH_ERROR, error);
        setIsLoading(false);
      }
    };

    if (address) {
      fetchData();
    } else {
      setData(null);
    }
  }, [address, landId, setData]);

  return { data, isLoading };
};
