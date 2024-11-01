// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Text, Flex } from 'components';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import ImageStoveChooseIcon from './stove-choose.svg';

export enum Position {
  left,
  right,
  top,
  bottom
}

const Wrapper = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundFocus};
  border: 2px solid #fff;
  border-radius: ${({ theme }) => theme.radii.circle};
  display: inline-flex;
  height: 100%;
  justify-content: center;
  transform: none;
  width: 100%;

  :disabled {
    cursor: default;
  }
`;

const Display = styled.img`
  height: 80%;
  width: 80%;
`;

const TipWrapper = styled(Flex)<{ $position: Position }>`
  position: absolute;
  ${({ $position }) => {
    switch ($position) {
      case Position.top:
        return 'bottom: calc(100% + 1rem)';
      case Position.right:
        return 'left: calc(100% + 1rem);';
      case Position.bottom:
        return 'top: calc(100% + 1rem);';
      case Position.left:
      default:
        return 'right: calc(-100% + 1rem);';
    }
  }}
`;
const Tip = styled(Text)<{ $isError: boolean }>`
  white-space: nowrap;
  ${({ $isError }) => $isError && 'color: #ff0000'}
`;

export interface StoveSlotProps {
  src?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  tips?: ReactNode[];
  isError?: boolean;
  position?: Position;
  selectable?: boolean;
}

export const StoveSlot = ({ className, src, disabled, onClick, tips, isError, position, selectable }: StoveSlotProps) => {
  return (
    <Wrapper disabled={disabled} className={className} onClick={() => onClick && onClick()}>
      {(src || selectable) && <Display alt='' src={src || (selectable && ImageStoveChooseIcon)} />}
      {tips && (
        <TipWrapper $position={position} flexDirection='column' alignItems='center'>
          {tips.map((tip, i) => (
            <Tip key={i} $isError={isError}>
              {tip}
            </Tip>
          ))}
        </TipWrapper>
      )}
    </Wrapper>
  );
};
