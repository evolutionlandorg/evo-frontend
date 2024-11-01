// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { $get } from 'utils/agent';
import { useEffect, useState } from 'react';
import { env } from 'config';
import type { Element, SUPPORTED_LANDS_INDEX } from 'types';
import { bundleApi } from 'api';
import { StatusResponse, Land } from './types';
import { FETCH_ERROR } from './constants';

export interface GetLandsListResponse extends StatusResponse {
  data: Land[];
  count: number;
}

export type GetLandsFilterType = 'secondhand' | 'all' | 'genesis' | 'my' | 'bid' | 'onsale' | 'unclaimed' | 'plo' | '';
export type GetLandsDisplayType = 'all' | 'my';
export type GetLandsOrderFieldType = 'price' | 'token_index' | 'gold_rate' | 'wood_rate' | 'water_rate' | 'fire_rate' | 'soil_rate';
export type GetLandsOrderType = 'asc' | 'desc';
export type GetLandsFlagType = '' | 'normal' | 'reserved' | 'box';
export type GetLandsElementType = Element;

export interface GetLandsListRequest {
  display: GetLandsDisplayType;
  filter: GetLandsFilterType;
  page: number;
  row: number;
  district?: string;
  order: GetLandsOrderType;
  orderField: GetLandsOrderFieldType;
  address?: string;
  landId: SUPPORTED_LANDS_INDEX;
  element?: GetLandsElementType[];
  flag?: GetLandsFlagType[];
  priceStart?: string;
  priceEnd?: string;
}

// display= my 先确认只查看自己的地块(包括出售中，待领取)， filter=my 筛选出自己空闲的地块（owner=me）
export const useGetLandsList = ({ landId, display = 'all', filter = 'genesis', page, row, district, order, orderField, address, element, flag, priceStart, priceEnd }: GetLandsListRequest) => {
  const [data, setData] = useState<GetLandsListResponse>({
    data: [],
    count: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiNetwork = env[landId].BACKEND_API_NETWORK;
        const response = await $get('/api/lands', { 'EVO-NETWORK': apiNetwork, display, filter, page, row, district, order, order_field: orderField, owner: bundleApi[landId].formatAddress(address), element, flag, 'price[gte]': priceStart, 'price[lte]': priceEnd });
        const responseData: GetLandsListResponse = response;
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(FETCH_ERROR, error);
        setIsLoading(false);
      }
    };

    if (!(display === 'my' && !address)) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, filter, page, row, district, setData, order, orderField, address, landId, JSON.stringify(element), JSON.stringify(flag), priceStart, priceEnd]);

  return { data, isLoading };
};
