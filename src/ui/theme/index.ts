// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AlertTheme } from 'components/Alert/types';
import { PopupWindowTheme } from 'components/PopupWindow/types';
import { ToggleTheme } from 'components/Toggle/theme';
import { TooltipTheme } from 'components/Tooltip/types';
import { Colors, ZIndices, MediaQueries, Shadows, Radii } from './types';

export interface EvolutionLandTheme {
  siteWidth: number;
  isDark: boolean;
  colors: Colors;
  alert: AlertTheme;
  popupWindow: PopupWindowTheme;
  zIndices: ZIndices;
  mediaQueries: MediaQueries;
  shadows: Shadows;
  toggle: ToggleTheme;
  radii: Radii;
  tooltip: TooltipTheme;
}

export { default as dark } from './dark';
export { default as light } from './light';

export { lightColors } from './colors';
export { darkColors } from './colors';
export * from './types';
