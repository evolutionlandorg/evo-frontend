// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BareProps } from '../types';
import Content from './Content';
import { Flex } from '../Box';
import { QuestionHelper } from '../QuestionHelper';

export interface Props extends BareProps {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  helpInfo?: React.ReactNode;
}

export const StyledTitle = styled.div`
  color: ${({ theme }) => theme.colors.textTitle};
  ${tw`font-bold`}
`;

const StyledSubTitle = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const ContentWithHeader: React.FC<Props> = ({ className, children, style, title, subTitle, helpInfo }) => {
  return (
    <div className={className} style={style}>
      <Flex justifyContent='space-between' alignItems='center'>
        {helpInfo ? (
          <StyledTitle>
            <Flex className='justify-center items-center'>
              <StyledTitle>{title}</StyledTitle>
              <QuestionHelper className='ml-2' text={helpInfo} />
            </Flex>
          </StyledTitle>
        ) : (
          <StyledTitle>{title}</StyledTitle>
        )}

        <StyledSubTitle>{subTitle}</StyledSubTitle>
      </Flex>
      <Content className='ContentWithHeader--content'>{children}</Content>
    </div>
  );
};

export default styled(ContentWithHeader)`
  .ContentWithHeader--content {
    background: ${({ theme }) => theme.colors.backgroundContent};
    ${tw`p-3 mt-2 break-all`}
    ${({ theme }) => theme.mediaQueries.sm} {
      ${tw`p-6`}
    }
  }
`;
