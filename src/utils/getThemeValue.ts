// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import get from 'lodash/get';
import { DefaultTheme } from 'styled-components';

const getThemeValue =
  (path: string, fallback?: string | number) =>
  (theme: DefaultTheme): string =>
    get(theme, path, fallback);

export default getThemeValue;
