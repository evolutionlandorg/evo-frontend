// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <path d='M17.5 12.323C17.5 13.1514 16.8284 13.823 16 13.823C15.1716 13.823 14.5 13.1514 14.5 12.323C14.5 11.4946 15.1716 10.823 16 10.823C16.8284 10.823 17.5 11.4946 17.5 12.323Z' />
      <path fillRule='evenodd' clipRule='evenodd' d='M21 5.323V7.603C21.59 7.953 22 8.583 22 9.323V15.323C22 16.063 21.59 16.693 21 17.043V19.323C21 20.423 20.1 21.323 19 21.323H5C3.89 21.323 3 20.423 3 19.323V5.323C3 4.223 3.89 3.323 5 3.323H19C20.1 3.323 21 4.223 21 5.323ZM13 15.323H20V9.323H13V15.323ZM5 5.323V19.323H19V17.323H13C11.9 17.323 11 16.423 11 15.323V9.323C11 8.223 11.9 7.323 13 7.323H19V5.323H5Z' />
    </Svg>
  );
};

export default Icon;
