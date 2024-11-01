// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { Box } from 'components/Box';

const Row = styled(Box)<{
  width?: string;
  align?: string;
  justify?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
}>`
  align-items: ${({ align }) => align ?? 'center'};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  display: flex;
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: 0;
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width ?? '100%'};
`;

export const RowBetween = styled(Row)`
  justify-content: space-between;
`;

export const RowFlat = styled.div`
  align-items: flex-end;
  display: flex;
`;

export const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  justify-content: ${({ justify }) => justify && justify};
  margin: ${({ gap }) => gap && `-${gap}`};

  > * {
    margin: ${({ gap }) => gap} !important;
  }
`;

export const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  margin: ${({ gap }) => gap && `-${gap}`};
  width: fit-content;
`;

export default Row;
