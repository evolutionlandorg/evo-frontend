// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DefaultTheme } from 'styled-components';
import { dark as darkAlert } from 'components/Alert/theme';
import { dark as darkPopupWindow } from 'components/PopupWindow/theme';
import { dark as darkToggle } from 'components/Toggle/theme';
import { dark as darkTooltip } from 'components/Tooltip/theme';
import base from './base';
import { darkColors } from './colors';

const darkTheme: DefaultTheme = {
  ...base,
  isDark: true,
  colors: darkColors,
  alert: darkAlert,
  popupWindow: darkPopupWindow,
  toggle: darkToggle,
  tooltip: darkTooltip
};

export default darkTheme;
