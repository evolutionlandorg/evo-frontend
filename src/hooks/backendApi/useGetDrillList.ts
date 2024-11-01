// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { $get } from 'utils/agent';
import { useEffect, useState } from 'react';
import Continents, { ContinentDistrictEnum } from 'config/continents';
import { env } from 'config';
import { remove0x } from 'api/utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { bundleApi } from 'api';
import { StatusResponse, Drill, Illustrated, RequestBareProps } from './types';
import { FETCH_ERROR } from './constants';

export type GetDrillFilterType = 'fresh' | 'working' | '';
export type GetDrillOrderType = 'asc' | 'desc' | '';
export type GetDrillClassType = '0' | '1' | '2';
export type GetDrillGradeType = '1' | '2' | '3';
export type GetDrillFormulaIdType = number;

export interface GetDrillListResponse extends StatusResponse {
  data: Drill[];
  count: number;
}

export interface GetDrillListRequest {
  page: number;
  row: number;
  address?: string;
  landId: SUPPORTED_LANDS_INDEX;
  filter?: GetDrillFilterType;
  order?: GetDrillOrderType;
  formulaId?: GetDrillFormulaIdType;
  drillClass?: GetDrillClassType[];
}

export interface GetIllustratedResponse extends StatusResponse {
  data: Illustrated[];
}

export interface GetIllustratedRequest {
  landId: ContinentDistrictEnum;
  // row: number;
}

export interface GetDrillRequest extends RequestBareProps {
  tokenId: string;
}

export interface GetDrillResponse extends StatusResponse {
  data: Drill;
}

export const useGetDrillList = ({ landId, page, row, address, filter, order, formulaId, drillClass }: GetDrillListRequest) => {
  const [data, setData] = useState<GetDrillListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiNetwork = env[landId].BACKEND_API_NETWORK;
        const response = await $get('/api/furnace/props', { 'EVO-NETWORK': apiNetwork, page, row, owner: bundleApi[landId].formatAddress(address), filter, order, formula_id: formulaId, class: drillClass });
        const responseData: GetDrillListResponse = response;
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(FETCH_ERROR, error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, row, setData, address, landId, filter, order, formulaId, drillClass]);

  return { data, isLoading };
};

export const useGetIllustratedList = ({ landId }) => {
  const [data, setData] = useState<GetIllustratedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const apiNetwork = env[landId].BACKEND_API_NETWORK;
        const response = await $get('/api/furnace/illustrated', { 'EVO-NETWORK': apiNetwork });
        const responseData: GetIllustratedResponse = response;
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(FETCH_ERROR, error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setData, landId]);

  return { data, isLoading };
};

export const useGetDrill = ({ landId, tokenId }: GetDrillRequest) => {
  const [data, setData] = useState<Drill | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const apiNetwork = env[landId].BACKEND_API_NETWORK;
        const response = await $get('/api/furnace/prop', { 'EVO-NETWORK': apiNetwork, token_id: remove0x(tokenId) });
        const responseData: GetDrillResponse = response;
        setData(responseData?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(FETCH_ERROR, error);
        setIsLoading(false);
      }
    };

    if (landId && tokenId) {
      fetchData();
    } else {
      setData(null);
    }
  }, [landId, setData, tokenId]);

  return { data, isLoading };
};
