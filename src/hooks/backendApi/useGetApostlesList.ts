// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { $get } from 'utils/agent';
import { useEffect, useState } from 'react';
import { env } from 'config';
import { remove0x } from 'api/utils';
import type { Element, SUPPORTED_LANDS_INDEX } from 'types';
import { useDeepCompareEffect } from 'ahooks';
import { bundleApi } from 'api';
import { StatusResponse, Apostle } from './types';
import { FETCH_ERROR } from './constants';

export interface GetApostlesListResponse extends StatusResponse {
  data: Apostle[];
  count: number;
}

// https://github.com/evolutionlandorg/evo-static/blob/master/API.doc.md#apostle-list
export type GetApostlesFilterType = 'fresh' | 'onsell' | 'fertility' | 'rent' | 'unbind' | 'mine' | 'listing' | 'my' | 'sire' | '';
export type GetApostlesDisplayType = 'all' | 'my';
export type GetApostlesOrderFieldType = 'price' | 'gen' | 'life' | 'hp' | 'strength' | 'time' | 'id';
export type GetApostlesOrderType = 'asc' | 'desc';
export type GetApostlesGenderType = 'male' | 'female';
export type GetApostlesElementType = Element;
export type GetApostlesOccupationalType = 'saber' | 'guard' | 'normal';

export interface GetApostlesListRequest {
  display: GetApostlesDisplayType;
  filter?: GetApostlesFilterType;
  order?: GetApostlesOrderType;
  orderField?: GetApostlesOrderFieldType;
  page: number;
  row: number;
  district: string;
  landId?: SUPPORTED_LANDS_INDEX;
  sireId?: string;
  owner?: string;
  element?: GetApostlesElementType[];
  priceStart?: string;
  priceEnd?: string;
  gensStart?: string;
  gensEnd?: string;
  occupational?: string[];
}

export const useGetApostlesList = ({ landId, display, filter = '', page, row, district, order, orderField, owner, sireId = '', element, priceStart, priceEnd, gensStart, gensEnd, occupational }: GetApostlesListRequest) => {
  const [data, setData] = useState<GetApostlesListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useDeepCompareEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const apiNetwork = env[landId].BACKEND_API_NETWORK;
        const response = await $get('/api/apostle/list', { 'EVO-NETWORK': apiNetwork, display, filter, page, row, district, order, order_field: orderField, owner: bundleApi[landId].formatAddress(owner), sire_id: remove0x(sireId), element, 'price[gte]': priceStart, 'price[lte]': priceEnd, 'gens[gte]': gensStart, 'gens[lte]': gensEnd });
        const responseData: GetApostlesListResponse = response;
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(FETCH_ERROR, error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [display, district, filter, landId, order, orderField, owner, page, row, setData, sireId, element, priceStart, priceEnd, gensStart, gensEnd, occupational]);

  return { data, isLoading };
};
