// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox='0 0 99 80' {...props}>
    <path d='M76.9247 24.1587C75.6081 10.5988 64.1509 0 50.204 0C36.4282 0 25.0905 10.3442 23.5448 23.6626C10.2031 25.7977 0 37.3001 0 51.202C0 66.626 12.5458 79.1304 28.0209 79.1304H42.2878V53.5294H22.8355L49.0365 25.601L75.2375 53.5294H56.2982V79.1304H72.3872V79.0102C86.7671 77.828 98.073 65.8404 98.073 51.202C98.073 38.1448 89.0714 27.2182 76.9247 24.1587Z' fill='url(#paint0_linear_5959_23744)' />
    <defs>
      <linearGradient id='paint0_linear_5959_23744' x1='90.484' y1='94.7917' x2='-10.5835' y2='81.5926' gradientUnits='userSpaceOnUse'>
        <stop offset='0.00520833' stopColor='#3ADDFF' />
        <stop offset='1' stopColor='#0066FF' />
      </linearGradient>
    </defs>
  </Svg>
);

export default Icon;
