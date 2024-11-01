// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 100 100' {...props}>
      <rect width='100' height='100' rx='50' fill='url(#paint0_linear_72_146)' />
      <path fillRule='evenodd' clipRule='evenodd' d='M58.6656 24.0024H41.3339V41.5164H24.0039V59.0305H41.3339V75.9975H58.6656V58.4834H41.3355V41.5165H58.6656V24.0024ZM75.9986 41.5164H58.667V59.0305H75.9986V41.5164Z' fill='black' />
      <defs>
        <linearGradient id='paint0_linear_72_146' x1='100' y1='-5.96046e-06' x2='5.96046e-06' y2='100' gradientUnits='userSpaceOnUse'>
          <stop offset='0.395833' stopColor='#A9FFE0' />
          <stop offset='1' stopColor='#86D5FF' />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;
