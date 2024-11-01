// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createReducer } from '@reduxjs/toolkit';

import { toggleTheme, acceptAlphaAgreement, acceptXRING2XWRING } from './actions';

export interface UserState {
  isDark: boolean;
  isAcceptAlphaAgreement: boolean;
  isAcceptCrabXRING2XWRING: boolean;
}

export const initialState: UserState = {
  isDark: true,
  isAcceptAlphaAgreement: false,
  isAcceptCrabXRING2XWRING: false
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(toggleTheme, (state) => {
      state.isDark = !state.isDark;
    })
    .addCase(acceptAlphaAgreement, (state) => {
      state.isAcceptAlphaAgreement = true;
    })
    .addCase(acceptXRING2XWRING, (state) => {
      state.isAcceptCrabXRING2XWRING = true;
    })
);
