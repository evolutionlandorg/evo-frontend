// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Svg from '../Svg';
import { SvgProps } from '../types';

const Icon: React.FC<SvgProps> = (props) => (
  <Svg viewBox='0 0 28 28' {...props}>
    <path fillRule='evenodd' clipRule='evenodd' d='M3 3V11H25V3H3ZM2 0C0.895431 0 0 0.89543 0 2V12C0 13.1046 0.895431 14 2 14H26C27.1046 14 28 13.1046 28 12V2C28 0.895431 27.1046 0 26 0H2Z' fill='#6988BE' />
    <path fillRule='evenodd' clipRule='evenodd' d='M15.1106 11.3782L15.1109 11.3567C15.1108 11.3639 15.1107 11.371 15.1106 11.3782ZM16 11.3207L15.8889 18.6802C15.8889 18.857 15.0111 19.0009 13.9389 19C12.8667 19 12 18.8561 12 18.6793L12.1111 11.3198C12.1111 11.143 12.9889 10.9991 14.0611 11C15.1333 11 16 11.1439 16 11.3207ZM12.8891 18.6433C12.8892 18.6361 12.8893 18.6289 12.8894 18.6218L12.8891 18.6433Z' fill='#6988BE' />
    <path fillRule='evenodd' clipRule='evenodd' d='M14 25C15.1046 25 16 24.1046 16 23C16 21.8954 15.1046 21 14 21C12.8954 21 12 21.8954 12 23C12 24.1046 12.8954 25 14 25ZM14 28C16.7614 28 19 25.7614 19 23C19 20.2386 16.7614 18 14 18C11.2386 18 9 20.2386 9 23C9 25.7614 11.2386 28 14 28Z' fill='#6988BE' />
  </Svg>
);

export default Icon;
