// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox='0 0 16 16' {...props}>
    <path d='M9.931 1.307c1.858.186 3.352 1.307 3.67 3.227h-1.076l1.737 2.588L16 4.534h-1.199c-.32-2.587-2.276-4.268-4.747-4.507-.342-.027-.66.266-.66.64.023.32.242.613.537.64ZM7.241 0H1.199c-.343 0-.61.293-.61.667v5.76c0 .375.267.668.61.668H7.24c.342 0 .61-.293.61-.667V.667c0-.374-.268-.667-.61-.667Zm-.588 5.815H1.787V1.28h4.868l-.002 4.535Zm-.588 8.853c-2.08-.185-3.67-1.573-3.744-3.867h1.15L1.738 8.216 0 10.801h1.15c.046 2.96 2.126 4.881 4.794 5.147.342.027.66-.266.66-.64a.635.635 0 0 0-.54-.64Zm8.759-5.787H8.782c-.345 0-.61.295-.61.667v5.787c0 .372.267.665.61.665h6.042c.342 0 .61-.293.61-.665V9.548c0-.372-.293-.667-.61-.667Zm-.588 5.814H9.367v-4.507h4.869v4.507Z' fill='url(#a)' />
    <defs>
      <linearGradient id='a' x1='14.762' y1='19.167' x2='-1.824' y2='17.419' gradientUnits='userSpaceOnUse'>
        <stop offset='.005' stopColor='#3ADDFF' />
        <stop offset='1' stopColor='#06F' />
      </linearGradient>
    </defs>
  </Svg>
);

export default Icon;
