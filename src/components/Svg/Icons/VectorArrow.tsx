// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const VectorArrow: React.FC<SvgProps> = (props) => (
  <Svg viewBox='0 0 18 9' {...props}>
    <path d='M12.182 0H7l5.758 4.5L7 9h5.182l5.757-4.5L12.182 0Z' fill='url(#a)' />
    <path d='M5.182 0H0l5.758 4.5L0 9h5.182l5.757-4.5L5.182 0Z' fill='url(#a)' />
    <defs>
      <linearGradient id='a' x1='16.551' y1='10.781' x2='-1.457' y2='6.999' gradientUnits='userSpaceOnUse'>
        <stop offset='.005' stopColor='#3ADDFF' />
        <stop offset='1' stopColor='#06F' />
      </linearGradient>
    </defs>
  </Svg>
);

export default VectorArrow;
