// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CONF_CURRENT_CONTINENT } from 'config';
import { ContinentIndexEnum } from 'config/continents';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CurrentLandState {
  index: ContinentIndexEnum; // Current land index
}

const initialState = {
  index: CONF_CURRENT_CONTINENT.index
} as CurrentLandState;

const slice = createSlice({
  name: 'currentLand',
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<ContinentIndexEnum>) => {
      state.index = action.payload;
      CONF_CURRENT_CONTINENT.index = action.payload;
    }
  }
});

export const { setIndex } = slice.actions;

export default slice.reducer;
