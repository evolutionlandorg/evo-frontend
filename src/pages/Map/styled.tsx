// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

export const LandModal = styled.div`

  background: ${({ theme }) => theme.colors.backgroundContent};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.default};
  bottom: 60px;
  overflow-y: auto;
  position: fixed;
  right: 10px;
  top: calc(96px + 10px);
  width: calc(100% - 20px);
  z-index: 9;

  ${({ theme }) => theme.mediaQueries.md} {
    bottom: 10px;
    width: 500px;
  }

  html[data-useragent*='TokenPocket_iOS'] & {
    bottom: 115px;
  }
`;

export const StyledLegendIconBox = styled.div`
  align-items: center;
  background: ${({ theme }) => `${theme.tooltip.background}`};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 12px;
  cursor: pointer;
  padding: 10px;
`;
