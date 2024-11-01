// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import tw from 'twin.macro';
import styled from 'styled-components';

export const StyledFlexWrapBox = styled.div`
button {
  width: 100%;
}

${tw`space-y-4`}
${({ theme }) => theme.mediaQueries.sm} {
  ${tw`space-x-4`}
  ${tw`space-y-0`}
  button {
    width: initial;
  }
}
`;

export const StyledPoint = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 50%;
  display: inline-block;
  height: 11px;
  margin-right: 5px;
  width: 11px;
`;
