// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { FlexProps } from 'styled-system';
import { SUPPORTED_LANDS_INDEX } from 'types';

export const variants = {
  DEFAULT: 'default',
  WARNING: 'warning',
  DANGER: 'danger',
  PENDING: 'pending'
} as const;

export type Variant = typeof variants[keyof typeof variants];

export interface UserMenuProps extends FlexProps {
  account?: string;
  text?: string;
  avatarSrc?: string;
  variant?: Variant;
  landId: SUPPORTED_LANDS_INDEX;
}

export interface UserMenuItemProps {
  disabled?: boolean;
}
