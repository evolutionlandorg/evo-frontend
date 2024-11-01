// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import Text from './Text';

const TooltipText = styled(Text)`
  text-decoration: ${({ theme }) => `underline dotted ${theme.colors.textSubtle}`};
  text-underline-offset: 0.1em;
`;

export default TooltipText;
