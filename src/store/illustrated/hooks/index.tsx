// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Illustrated } from 'hooks/backendApi';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../index';
import { fetchDataAsync as fetchIllustratedDataAction } from '../index';

export function useIllustratedList(): [Illustrated[], (x) => void] {
  const dispatch = useDispatch();
  const illustratedList = useSelector<AppState, AppState['illustrated']['data']>((state) => state.illustrated.data);

  const fetchIllustratedData = useCallback(
    (landId) => {
      if (landId) {
        dispatch(fetchIllustratedDataAction(landId));
      }
    },
    [dispatch]
  );

  return [illustratedList, fetchIllustratedData];
}
