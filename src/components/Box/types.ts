// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { HTMLAttributes } from 'react';
import { BackgroundProps, BorderProps, FlexboxProps, LayoutProps, PositionProps, SpaceProps, GridProps as _GridProps } from 'styled-system';

export interface BoxProps extends BackgroundProps, BorderProps, LayoutProps, PositionProps, SpaceProps, HTMLAttributes<HTMLDivElement> {}

export interface FlexProps extends BoxProps, FlexboxProps {}

export interface GridProps extends FlexProps, _GridProps {}
