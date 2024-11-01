// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import tw from 'twin.macro';
import styled from 'styled-components';
import { Box, Flex } from 'components';

export const StyledApostlesBox = styled(Flex)`
  padding: 1rem;
  flex-direction: column;
  background-color: #151c2e;
  justify-content: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.cardBorderSecondary} url('/images/apostle/modal/breed-bg.png') no-repeat;
  background-size: contain;
  ${tw`rounded-lg`}
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 2rem;
    width: 500px;
  }
`;

export const StyledTips = styled(Box)`
  align-self: center;
`;
