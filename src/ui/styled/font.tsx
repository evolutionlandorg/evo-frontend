// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import tw from 'twin.macro';
import styled from 'styled-components';

export const StyledFontAttr = styled.p`
${tw`font-bold text-xs tracking-wider uppercase`}

color: ${({ theme }) => theme.colors.textTitle};
`;

export const StyledFontNormal = styled.p`
${tw`text-xs tracking-wider`}

color: ${({ theme }) => theme.colors.textTitle};
`;

export const StyledFontActive = styled.p`
  color: ${({ theme }) => theme.colors.textActive};
  display: inline-block;
`;

export const StyledFontTitle = styled.p`
${tw`font-bold text-xs tracking-wider`}

color: ${({ theme }) => theme.colors.textTitle};
`;
