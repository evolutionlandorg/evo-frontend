// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../index';
import { toggleTheme as toggleThemeAction, acceptAlphaAgreement as acceptAlphaAgreementAction, acceptXRING2XWRING as acceptXRING2XWRINGAction } from '../actions';

export function useThemeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector<AppState, AppState['user']['isDark']>((state) => state.user.isDark);

  const toggleTheme = useCallback(() => {
    dispatch(toggleThemeAction());
  }, [dispatch]);

  return [isDark, toggleTheme];
}

export function useUserAcceptAlphaAgreement(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>();
  const isAcceptAlphaAgreement = useSelector<AppState, AppState['user']['isAcceptAlphaAgreement']>((state) => state.user.isAcceptAlphaAgreement);

  const acceptAlphaAgreement = useCallback(() => {
    dispatch(acceptAlphaAgreementAction());
  }, [dispatch]);

  return [isAcceptAlphaAgreement, acceptAlphaAgreement];
}

export function useAcceptCrabXRING2XWRING(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>();
  const isAcceptCrabXRING2XWRING = useSelector<AppState, AppState['user']['isAcceptCrabXRING2XWRING']>((state) => state.user.isAcceptCrabXRING2XWRING);

  const acceptCrabXRING2XWRING = useCallback(() => {
    dispatch(acceptXRING2XWRINGAction());
  }, [dispatch]);

  return [isAcceptCrabXRING2XWRING, acceptCrabXRING2XWRING];
}
