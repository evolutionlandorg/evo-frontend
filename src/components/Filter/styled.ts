// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import tw from 'twin.macro';
import styled from 'styled-components';
import { Box } from '../Box';

export const FilterBox = styled.div`
${tw`pt-4`}
`;

export const FilterTitle = styled.div`
${tw`font-bold text-gray-400`}
`;

export const FilterContent = styled.div`
${tw`pt-2`}
`;

export const StyledFilterContainer = styled(Box)`
  background: ${({ theme }) => theme.colors.background};
  ${tw`flex flex-col border-r border-current overflow-y-auto border-gray-600 p-8 absolute w-full h-full z-10`}
 
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 250px;
    position: initial;
  }
`;

export const FilterIconBox = styled.div`
  padding: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: ${({ theme }) => theme.colors.tertiary};
  border-radius: ${({ theme }) => theme.radii.circle};
  right: 30px;
  top: 105px;
  z-index: 15;
`;
