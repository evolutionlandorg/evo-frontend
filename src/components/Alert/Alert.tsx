// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import Flex from '../Box/Flex';
import { AlertProps, variants } from './types';

interface ThemedIconLabel {
  variant: AlertProps['variant'];
  theme: DefaultTheme;
  hasDescription: boolean;
}

const getThemeColor = ({ theme, variant = variants.INFO }: ThemedIconLabel) => {
  switch (variant) {
    case variants.DANGER:
      return theme.colors.failure;
    case variants.WARNING:
      return theme.colors.warning;
    case variants.SUCCESS:
      return theme.colors.success;
    case variants.INFO:
    default:
      return theme.colors.secondary;
  }
};

const IconLabel = styled.div<ThemedIconLabel>`
  background-color: ${getThemeColor};
  border-radius: 16px 0 0 16px;
  color: ${({ theme }) => theme.alert.background};
  padding: 12px;
`;

const withHandlerSpacing = 32 + 12 + 8; // button size + inner spacing + handler position
const Details = styled.div<{ hasHandler: boolean }>`
  flex: 1;
  padding-bottom: 12px;
  padding-left: 12px;
  padding-right: ${({ hasHandler }) => (hasHandler ? `${withHandlerSpacing}px` : '12px')};
  padding-top: 12px;
`;

const CloseHandler = styled.div`
  border-radius: 0 16px 16px 0;
  position: absolute;
  right: 8px;
  top: 8px;
`;

const StyledAlert = styled(Flex)`
  background-color: ${({ theme }) => theme.alert.background};
  border-radius: 16px;
  box-shadow: 0 20px 36px -8px rgba(14, 14, 44, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const Alert: React.FC<AlertProps> = ({ title, children, variant, onClick }) => {
  return (
    <StyledAlert>
      <Details hasHandler={!!onClick}>
        <p>{title}</p>
        {typeof children === 'string' ? <p>{children}</p> : children}
      </Details>
      {onClick && (
        <CloseHandler>
          <button type='button' aria-label='Alert Button' onClick={onClick} />
        </CloseHandler>
      )}
    </StyledAlert>
  );
};

export default Alert;
