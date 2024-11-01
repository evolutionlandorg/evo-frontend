// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox='0 0 60 60' {...props}>
    <path d='M43.09 23.926 48 26.157V48H12V26.157l4.91-2.231V12h26.18v11.926Zm0 3.595v1.66l1.741-.87-1.74-.79Zm-3.272 3.297V15.273H20.182v15.545L30 35.728l9.818-4.91ZM16.91 29.182V27.52l-1.74.79 1.74.87Zm6.546-10.636h13.09v3.272h-13.09v-3.273Zm0 6.545h9.818v3.273h-9.819V25.09Z' />
  </Svg>
);

export default Icon;
