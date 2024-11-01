// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { Children, FC } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { StyledFontTitle } from 'ui/styled';
import { ContentWithHeader } from 'components/Content';
import { Text } from 'components/Text';

const ColTitle = styled(StyledFontTitle)`
  ${tw`text-xs h-4`}

  white-space: nowrap;
  ${({ theme }) => theme.mediaQueries.sm} {
    ${tw`text-sm h-5`}
  }
`;
const ColContent = styled(Text)`
  ${tw`text-xs`}

  white-space: nowrap;
  ${({ theme }) => theme.mediaQueries.sm} {
    ${tw`text-lg`}
  }
`;
interface ScrollableColProps {
  title: string;
  display?: boolean;
}

export const ScrollableTableCol: FC<ScrollableColProps> = ({ title, display = true, children }) =>
  display && (
    <div>
      <ColTitle>{title}</ColTitle>
      <ColContent>{children}</ColContent>
    </div>
  );

const Row = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: ${({ $count }) => `repeat(${$count}, minmax(0, 1fr)) `};
  ${tw`p-5`}
  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  }
`;

interface ScrollableTableRowProps {
  className?: string;
}

export const ScrollableTableRow: FC<ScrollableTableRowProps> = ({ children, className }) => (
  <Row $count={Children.count(children)} className={className}>
    {children}
  </Row>
);

const Wrapper = styled(ContentWithHeader)`
  .ContentWithHeader--content {
    ${tw`p-0`}

    max-height: 50vh;
    overflow: auto;
  }
`;

interface ScrollableTableProps {
  title?: string;
}

export const ScrollableTable: FC<ScrollableTableProps> = ({ title = '', children }) => <Wrapper title={title}>{children}</Wrapper>;
