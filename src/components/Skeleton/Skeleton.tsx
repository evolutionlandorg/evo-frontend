// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { space, layout } from 'styled-system';
import { SkeletonProps, animation as ANIMATION, variant as VARIANT } from './types';

const waves = keyframes`
    from {
      left: -150px;
    }

    to {
      left: 100%;
    }
`;

const pulse = keyframes`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`;

const Root = styled.div<SkeletonProps>`
  min-height: 20px;
  display: block;
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: ${({ variant, theme }) => (variant === VARIANT.CIRCLE ? theme.radii.circle : theme.radii.small)};

  ${layout}
  ${space}
`;

const Pulse = styled(Root)`
  animation: ${pulse} 2s infinite ease-out;
  transform: translate3d(0, 0, 0);
`;

const Waves = styled(Root)`
  overflow: hidden;
  position: relative;
  transform: translate3d(0, 0, 0);

  &::before {
    animation: ${waves} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    background-image: linear-gradient(90deg, transparent, rgba(243, 243, 243, 0.5), transparent);
    content: '';
    height: 100%;
    left: -150px;
    position: absolute;
    top: 0;
    width: 150px;
  }
`;

const Skeleton: React.FC<SkeletonProps> = ({ variant = VARIANT.RECT, animation = ANIMATION.PULSE, ...props }) => {
  if (animation === ANIMATION.WAVES) {
    return <Waves variant={variant} {...props} />;
  }

  return <Pulse variant={variant} {...props} />;
};

export default Skeleton;
