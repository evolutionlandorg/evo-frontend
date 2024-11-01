// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { shadows } from 'ui/theme/base';
import { darkColors, lightColors } from 'ui/theme/colors';
import { TooltipTheme } from './types';

export const light: TooltipTheme = {
  background: lightColors.collapseBodyBackground,
  borderColor: lightColors.cardBorder,
  text: lightColors.text,
  boxShadow: shadows.tooltip
};

export const dark: TooltipTheme = {
  background: darkColors.collapseBodyBackground,
  borderColor: darkColors.cardBorder,
  text: darkColors.text,
  boxShadow: shadows.tooltip
};
