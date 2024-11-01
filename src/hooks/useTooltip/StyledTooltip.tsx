// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

export const Arrow = styled.div`
  &,
  &::before {
    border-radius: 2px;
    height: 10px;
    position: absolute;
    width: 10px;
    z-index: -1;
  }

  &::before {
    background: ${({ theme }) => theme.tooltip.borderColor};
    content: '';
    transform: rotate(45deg);
  }
`;

export const StyledTooltip = styled.div`
  background: ${({ theme }) => theme.tooltip.background};
  border: 2px solid ${({ theme }) => theme.tooltip.borderColor};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
  color: ${({ theme }) => theme.tooltip.text};
  font-size: 16px;
  line-height: 130%;
  max-width: 320px;
  padding: 16px;
  z-index: 101;

  &[data-popper-placement^="top"] > ${Arrow} {
    bottom: -4px;
  }

  &[data-popper-placement^="bottom"] > ${Arrow} {
    top: -4px;
  }

  &[data-popper-placement^="left"] > ${Arrow} {
    right: -4px;
  }

  &[data-popper-placement^="right"] > ${Arrow} {
    left: -4px;
  }
`;
