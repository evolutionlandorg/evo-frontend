// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ReactNode } from 'react';
import { BoxProps } from 'components/Box';

export type PopupWindowTheme = {
  backgroundBlue: string;
  backgroundPink: string;
};

export interface PopupHeaderProps extends BoxProps {
  title: string;
  color?: string;
  onClose?: () => void;
  children?: ReactNode;
}
