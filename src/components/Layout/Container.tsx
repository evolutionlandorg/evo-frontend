// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Box, BoxProps } from 'components/Box';
import styled from 'styled-components';

const StyledContainer = styled(Box)`
  padding: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 16px 24px;
  }
`;

const Container: React.FC<BoxProps> = ({ children, ...props }) => (
  <StyledContainer mx='auto' maxWidth='1000px' {...props}>
    {children}
  </StyledContainer>
);

export default Container;
