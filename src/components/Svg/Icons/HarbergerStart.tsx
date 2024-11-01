// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox='0 0 20 20' {...props}>
    <path d='M13.496 7.312c-.16-2.48-1.035-4.909-2.652-6.928a1.001 1.001 0 0 0-1.577 0 12.539 12.539 0 0 0-2.783 6.928 13.959 13.959 0 0 1 3.506 2.696 14.454 14.454 0 0 1 3.506-2.696Zm-6.53 2.716c-.14-.102-.301-.195-.452-.297.15.113.312.195.452.297Zm6.45-.256c-.131.092-.272.164-.402.266.13-.102.27-.174.402-.266ZM9.99 13.277c-1.959-3.044-5.163-5.155-8.87-5.524A1.03 1.03 0 0 0 .005 8.891C.457 13.81 3.67 17.889 8.02 19.477c.633.236 1.296.41 1.979.523a12.79 12.79 0 0 0 1.979-.523c4.35-1.588 7.564-5.657 8.016-10.586.06-.656-.482-1.2-1.115-1.138-3.727.369-6.931 2.48-8.89 5.524Z' fill='url(#a)' />
    <defs>
      <linearGradient id='a' x1='0' y1='5.5' x2='0' y2='20' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#C1FF84' />
        <stop offset='1' stopColor='#0FEB00' />
      </linearGradient>
    </defs>
  </Svg>
);

export default Icon;
