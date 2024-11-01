// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox='0 0 24 24' {...props}>
    <path d='M23.0768 1.98841e-05H0.922992C0.413453 1.98841e-05 -8.50133e-05 0.486404 -8.50133e-05 1.0857C-8.50133e-05 1.68499 0.413453 2.17138 0.922992 2.17138H1.84607V22.7514C1.84607 23.7199 2.80238 24.3192 3.55376 23.8198L11.0178 18.8712C11.6215 18.4674 12.3784 18.4674 12.9821 18.8712L20.4461 23.8198C21.1975 24.3192 22.1538 23.722 22.1538 22.7514V2.17138H23.0768C23.5864 2.17138 23.9999 1.68499 23.9999 1.0857C23.9999 0.486404 23.5864 1.98841e-05 23.0768 1.98841e-05Z' fill='url(#paint0_linear_7858_2602)' />
    <defs>
      <linearGradient id='paint0_linear_7858_2602' x1='22.1429' y1='28.75' x2='-2.73554' y2='26.1285' gradientUnits='userSpaceOnUse'>
        <stop offset='0.00520833' stopColor='#3ADDFF' />
        <stop offset='1' stopColor='#0066FF' />
      </linearGradient>
    </defs>
  </Svg>
);

export default Icon;
