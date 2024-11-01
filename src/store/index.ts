// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { configureStore, getDefaultMiddleware, ThunkAction, Action } from '@reduxjs/toolkit';
import { save, load } from 'redux-localstorage-simple';
import cloneDeep from 'lodash/cloneDeep';

import counter from './counter';
import currentContinent from './currentContinent';
import landsData from './landsData';
// eslint-disable-next-line import/no-cycle
import illustratedData, { initialState as illustratedInitialState } from './illustrated';
import user, { initialState as userInitialState } from './user/reducer';
import transactions, { initialState as transactionsInitialState } from './transactions/reducer';
import blockReducer from './block';

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'illustrated'];

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    block: blockReducer,
    user,
    illustrated: illustratedData,
    counter,
    currentContinent,
    landsData,
    transactions
  },
  middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS })],
  preloadedState: load({
    states: PERSISTED_KEYS,
    preloadedState: {
      user: cloneDeep(userInitialState),
      transactions: cloneDeep(transactionsInitialState),
      illustrated: cloneDeep(illustratedInitialState)
    }
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
