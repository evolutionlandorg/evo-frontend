// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { ArrowBackIcon, CloseIcon } from '../Svg';
import { IconButton } from '../Button';
import Flex from '../Box/Flex';
import { Box } from '../Box';
import { ModalProps } from './types';

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: ${({ background }) => background || 'transparent'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  display: flex;
  padding: 12px 24px;
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  color: ${({ theme }) => theme.colors.textTitle};
  flex: 1;
  font-size: 1rem;
  font-weight: bold;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;

  /* max-height: 90vh; */
  overflow-y: auto;
`;

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps['onDismiss'] }> = ({ onDismiss }) => {
  return (
    <IconButton variant='text' onClick={onDismiss} aria-label='Close the dialog'>
      <CloseIcon color='primary' />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps['onBack'] }> = ({ onBack }) => {
  return (
    <IconButton variant='text' onClick={onBack} area-label='go back' mr='8px'>
      <ArrowBackIcon color='primary' />
    </IconButton>
  );
};

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  background: ${({ theme }) => theme.colors.backgroundContent};
  border: 2px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 10px;
  box-shadow: 0 20px 36px -8px rgba(14, 14, 44, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05);
  max-height: 100vh;
  overflow: auto;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};
  ${({ theme }) => theme.mediaQueries.xs} {
    max-width: 100%;
    min-width: ${({ minWidth }) => minWidth};
    width: auto;
  }
`;
