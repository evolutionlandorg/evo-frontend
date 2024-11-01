// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SVGAttributes } from 'react';
import { DefaultTheme } from 'styled-components';
import { SpaceProps } from 'styled-system';

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement>, SpaceProps {
  theme?: DefaultTheme;
  spin?: boolean;
}
