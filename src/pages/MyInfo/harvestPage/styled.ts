// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { Flex } from 'components';

export const StyledFooterBox = styled(Flex)`
  justify-content: space-between;
  margin-top: 1rem;
  flex-direction: column;
  >div {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`;

export const StyledPageBox = styled(Flex)`
  flex-direction: column-reverse;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`;
