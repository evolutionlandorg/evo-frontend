// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { darkColors, lightColors } from 'ui/theme/colors';

export type ToggleTheme = {
  handleBackground: string;
};

export const light: ToggleTheme = {
  handleBackground: lightColors.backgroundAlt
};

export const dark: ToggleTheme = {
  handleBackground: darkColors.backgroundAlt
};
