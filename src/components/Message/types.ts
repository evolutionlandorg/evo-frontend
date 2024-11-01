// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { SpaceProps } from 'styled-system';

export const variants = {
  WARNING: 'warning',
  DANGER: 'danger'
} as const;

export type Variant = typeof variants[keyof typeof variants];

export interface MessageProps extends SpaceProps {
  variant: Variant;
  icon?: React.ReactNode;
}
