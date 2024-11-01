// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { Box } from 'components';
import tw from 'twin.macro';

export const StyledOperContainer = styled(Box)`
width: 360px;
height: 400px;
background: ${({ theme }) => theme.colors.backgroundContent};
${tw`rounded-lg flex flex-col self-center p-6`}
`;

export const StyledTitle = styled.p`
${tw`text-base font-bold`}
`;
