// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox='0 0 60 60' {...props}>
    <path d='M12 29.9v16.8h36V29.9H12Zm30.8 14.3H17.2V32.1h25.6v12.1ZM23 13v14.3h14V13H23Zm5.462 10.825L24.988 19.5l3.05 1.675 6.975-5.525-6.55 8.175ZM42.8 24.7h-4.9v1.7h1.6l1.4 1.9H19.1l1.4-1.9h1.6v-1.7h-4.9L12 29.9h36l-5.2-5.2Z' />
  </Svg>
);

export default Icon;
