// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const FurnacePreview: React.FC<SvgProps> = (props) => (
  <Svg viewBox='0 0 18 9' {...props}>
    <path d='M12.182 0H7l5.758 4.5L7 9h5.182l5.757-4.5L12.182 0Z' fill='url(#a)' />
    <path d='M5.182 0H0l5.758 4.5L0 9h5.182l5.757-4.5L5.182 0Z' fill='url(#a)' />
    <defs>
      <linearGradient id='a' x1='0' y1='4.5' x2='9.027' y2='13.47' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#F76B1C' />
        <stop offset='1' stopColor='#FAD961' />
      </linearGradient>
    </defs>
  </Svg>
);

export default FurnacePreview;
