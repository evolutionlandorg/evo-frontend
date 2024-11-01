// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getLands } from 'api/evo';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface LandDataState {
  gx: number;
  gy: number;
  land_id: number;
  lat: number;
  lon: number;
  owner: string;
  resource: string;
  token_id: string;
  sticker: string;
  status: string;
  current_price: string;
}

export interface FetchLandsDataState {
  data: LandDataState[];
  extend: {
    total: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

interface fetchParam {
  display?: string;
  filter?: string;
  page?: number;
  row?: number;
}

const initialState = {
  data: [],
  extend: {
    total: 0
  },
  status: 'idle',
  error: null
} as FetchLandsDataState;

export const fetchLandsData = createAsyncThunk('data/lands', async (params: fetchParam) => {
  return new Promise<{ total: number; data: LandDataState[] }>((resolve, reject) => {
    getLands({
      display: params.display,
      filter: params.filter,
      page: params.page,
      row: params.row
    })
      .then((res) => {
        const { count, data } = res;
        resolve({ total: count, data });
      })
      .catch((err) => reject(err));
  });
});

const slice = createSlice({
  name: 'landsData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLandsData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchLandsData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'Something Error';
    });
    builder.addCase(fetchLandsData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload.data;
      state.extend.total = action.payload.total;
    });
  }
});

export default slice.reducer;
