// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Text, Flex, Button, Toggle, SvgProps } from 'components';
import IconComponent from 'components/Svg/IconComponent';

export interface Props {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
}

const ThemeSwitcher: React.FC<Props> = ({ isDark, toggleTheme }) => <Toggle checked={isDark} defaultColor='textDisabled' checkedColor='textDisabled' onChange={() => toggleTheme(!isDark)} scale='md' startIcon={(isActive = false) => <IconComponent iconName='Sun' color={isActive ? 'warning' : 'backgroundAlt'} />} endIcon={(isActive = false) => <IconComponent iconName='Moon' color={isActive ? 'secondary' : 'backgroundAlt'} />} />;

export default React.memo(ThemeSwitcher, (prev, next) => prev.isDark === next.isDark);
