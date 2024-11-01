// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import tw from 'twin.macro';
import styled from 'styled-components';
import { Box, Flex } from 'components';

export const StyledLandDetailLayout = styled.div`
  ${tw`flex flex-col md:flex-row`}
`;

export const StyledLandDetailLayoutLeft = styled.div`
  ${tw`flex flex-col justify-start items-center`}

  flex: 1;

  >div {
    position: sticky;
    top: 20px;
  }
`;

export const StyledLandDetailLayoutRight = styled.div`
  ${tw`p-2 space-y-6 self-stretch w-full mt-10`}

  flex: 4;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 1.5rem;
    margin-top: 0;
    padding: 0;
  }
`;

export const StyledLandDetailLayoutMap = styled.div`
  ${tw`p-2 space-y-6 self-stretch w-full`}
`;

export const StyledPaneBox = styled(Box)`
  height: calc(100vh - 96px);
`;

export const StyledNftBoxList = styled.div`
  ${tw`py-2 mb-8 overflow-y-auto grid gap-x-4 gap-y-4 `}

  grid-template-columns: repeat(2, minmax(0, 1fr));
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
`;

export const StyledNftBoxListInPage = styled.div`
  ${tw`mb-8 overflow-y-auto grid gap-x-2 gap-y-2`}

  grid-template-columns: repeat(2, minmax(0, 1fr));

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    ${tw`gap-x-4 gap-y-4`}
  }
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const StyledScrollY = styled(Flex)`
  ${tw`px-4 py-6 h-full overflow-y-auto flex-1 flex-col`}
  ${({ theme }) => theme.mediaQueries.sm} {
    ${tw`p-8`}
  }
`;

export const StyledContentBox = styled.div`
  background: ${({ theme }) => theme.colors.collapseBodyBackground};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  ${tw`rounded-2xl p-2`}
  ${({ theme }) => theme.mediaQueries.sm} {
    ${tw`p-4`}
  }
`;
