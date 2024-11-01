// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AnchorHTMLAttributes } from 'react';
import { TextProps } from '../Text';

export interface LinkProps extends TextProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  to?: string;
}

export interface LinkRouterProps extends TextProps {
  external?: boolean;
  to?: string;
}
