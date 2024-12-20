// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg xmlns='http://www.w3.org/2000/svg' viewBox='0, 0, 480,480' {...props}>
      <title>Unstoppable Domains-Sign-Dark</title>
      <g id='Unstoppable-Domains-Sign-Dark' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <rect id='Rectangle' fill='#4C47F7' x='0' y='0' width='480' height='480' />
        <g id='Unstoppable-Domains---Sign---Dark---Transparent' transform='translate(73.000000, 93.000000)'>
          <polygon id='Rectangle-Copy-3' fill='#2FE9FF' points='320 5 320 115 -4.54747351e-13 245' />
          <path d='M260,0 L260,190 C260,245.228475 215.228475,290 160,290 C104.771525,290 60,245.228475 60,190 L60,110 L120,77 L120,190 C120,209.329966 135.670034,225 155,225 C174.329966,225 190,209.329966 190,190 L190,38.5 L260,0 Z' id='Path' fill='#FFFFFF' />
        </g>
      </g>
    </Svg>
  );
};

export default Icon;
