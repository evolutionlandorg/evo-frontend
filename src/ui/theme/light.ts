// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DefaultTheme } from 'styled-components';
import { light as lightAlert } from 'components/Alert/theme';
import { light as lightPopupWindow } from 'components/PopupWindow/theme';
import { light as lightToggle } from 'components/Toggle/theme';
import { light as lightTooltip } from 'components/Tooltip/theme';

import base from './base';
import { lightColors } from './colors';

const lightTheme: DefaultTheme = {
  ...base,
  isDark: false,
  colors: lightColors,
  alert: lightAlert,
  popupWindow: lightPopupWindow,
  toggle: lightToggle,
  tooltip: lightTooltip
};

export default lightTheme;
