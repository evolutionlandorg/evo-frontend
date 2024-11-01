// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Illustrated } from 'hooks/backendApi/types';
import { GetIllustratedResponse } from 'hooks/backendApi/useGetDrillList';
import Continents, { ContinentDistrictEnum } from 'config/continents';
import { env } from 'config';
import { $get } from 'utils/agent';
import { SUPPORTED_LANDS_INDEX } from 'types';
// eslint-disable-next-line import/no-cycle
import { AppThunk } from '../index';

export interface FetchIllustratedDataState {
  data: Illustrated[];
  extend: {
    total: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

export interface fetchParam {
  landId: SUPPORTED_LANDS_INDEX;
}

export const initialState = {
  data: []
  // extend: {
  //   total: 0
  // },
  // status: 'idle',
  // error: null
} as FetchIllustratedDataState;

const slice = createSlice({
  name: 'illustratedData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data;
    }
  }
});

export const { setData } = slice.actions;

export const fetchDataAsync =
  (landId): AppThunk =>
  (dispatch) => {
    const apiNetwork = env[landId].BACKEND_API_NETWORK;
    $get('/api/furnace/illustrated', { 'EVO-NETWORK': apiNetwork })
      .then((res: GetIllustratedResponse) => {
        const { data } = res;
        dispatch(setData({ data }));
      })
      .catch((err) => console.info(err));
  };

export default slice.reducer;
