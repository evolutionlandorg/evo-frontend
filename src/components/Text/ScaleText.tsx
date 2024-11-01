// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import Text from './Text';

export const ScaleText = styled(Text)`
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 18px;
  }
`;

export const ScaleH1 = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 20px;
  }
`;
