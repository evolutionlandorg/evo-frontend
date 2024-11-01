// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { flexbox } from 'styled-system';
import Box from './Box';
import { FlexProps } from './types';

const ScaleFlex = styled(Box)<FlexProps>`
  display: flex;
  flex-direction: column;
  ${flexbox}
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`;

export default ScaleFlex;
