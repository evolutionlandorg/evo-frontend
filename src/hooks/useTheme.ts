// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useContext } from 'react';
import { ThemeContext as StyledThemeContext } from 'styled-components';
import { useThemeManager } from 'store/user/hooks';

const useTheme = () => {
  const [isDark, toggleTheme] = useThemeManager();
  const theme = useContext(StyledThemeContext);
  return { isDark, theme, toggleTheme };
};

export default useTheme;
