// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import tw from 'twin.macro';

export const StyledContainer = styled.div<{ pointer?: boolean }>`
  padding: 10px;
  min-height: 250px;
  background: ${({ theme }) => theme.colors.backgroundContent};
  border:1px solid ${({ theme }) => theme.colors.cardBorderSecondary};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'default')};
  ${tw`flex justify-center items-center flex-col rounded-lg hover:bg-opacity-50`}
  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
  }
`;

export const StyledHeader = styled.div`
  ${tw`flex self-stretch justify-between items-center space-x-4 text-xs`}
`;

export const StyledNumberBox = styled.div`
  background: ${({ theme }) => theme.colors.numberBackground};
  ${tw`rounded-xl text-white px-2 py-1 font-bold truncate`}
`;

export const StyledMiniContainer = styled.div<{ pointer?: boolean; boxSize?: number }>`
  padding: 3px;
  width: ${({ boxSize }) => (boxSize ? `${boxSize}px` : '100px')};
  height: ${({ boxSize }) => (boxSize ? `${boxSize}px` : '100px')};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'default')};
  ${tw`flex justify-center items-center rounded-lg overflow-hidden hover:bg-opacity-80`}
`;

export const StyledMiniImg = styled.img`
  width: 100%;
  height: 100%;
  ${tw`rounded-lg overflow-hidden`}
`;

export const StyledMiniEmptyIcon = styled.img`
  width: 40px;
  height: 40px;
`;

export const StyledEmptyIcon = styled.img`
  width: 60px;
  height: 60px;
`;

export const StyledSubtitle = styled.div`
  ${tw`text-white font-bold`}
`;

export const StyledSubtitleIcon = styled.img`
  ${tw`mr-1`}
`;

export const StyledNFTBox = styled.div`
  ${tw`flex justify-center items-center rounded my-5 text-center relative w-full`}
`;

export const StyledStatusBar = styled.div`
  ${tw`absolute bottom-0 space-x-1 text-left`}
  width: 90%;
`;

export const StyledLabel = styled.div`
  background: ${({ theme }) => theme.colors.backgroundContent};
  border-radius: 20px;
  padding: 0.15rem 0.5rem;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
`;

export const StyleTooltipLine = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.backgroundContent};
`;

export * from './NFTImg';
