// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import tw from 'twin.macro';
import { Box, Text } from 'components';

export const StyledTokenLink = styled(Box)`
  position: absolute;
  ${tw`flex right-3 top-2 space-x-1`}
`;

export const StyledTokenSub = styled.div<{ bg: string }>`
  align-items: center;
  background: ${({ bg, theme }) => bg || theme.colors.cardBorderSecondary};
  ${tw`flex w-full justify-between rounded-2xl px-3 py-6 flex-col`}
`;

export const StyledTokenSymbol = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export const StyledButtonBox = styled.div`
  button, a {
    width: 100%;
  }
  ${tw`space-y-4 mt-3`}
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    flex-direction: row;
    ${tw`space-x-4 space-y-0`}
    button, a {
      flex: 1;
      width: initial
    }
  }
`;
