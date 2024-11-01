// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Link from './Link';
import { LinkProps } from './types';
import OpenNewIcon from '../Svg/Icons/OpenNew';

const LinkExternal: React.FC<LinkProps> = ({ children, ...props }) => (
  <Link external {...props}>
    {children}
    <OpenNewIcon color={props.color ? props.color : 'primary'} ml='4px' />
  </Link>
);

export default LinkExternal;
