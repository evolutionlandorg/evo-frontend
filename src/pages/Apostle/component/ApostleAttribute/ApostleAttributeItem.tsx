// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { ScaleText, Text } from 'components';
import { BareProps } from 'components/types';
import tw from 'twin.macro';
import { StyledFontAttr } from 'ui/styled';
import type { ApostleAttribute } from 'hooks/backendApi/types';

export interface Props extends BareProps {
  title: string;
  attribute: ApostleAttribute;
  iconUrl?: string;
  bgColor?: string;
}

const StyledABC123 = styled.div`
  ${tw`flex items-center space-x-2 sm:space-x-5`}
`;

const StyledAttrIconBox = styled.div<{ bgColor: string }>`
  background: ${({ bgColor }) => bgColor || 'transparent'};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  width: 25px;
  height: 25px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 46px;
    width: 46px;
  }
  ${tw`rounded-lg hover:bg-opacity-80 flex justify-center items-center`}
`;

const StyledAttrIcon = styled.img`
  height: 15px;
  width: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 25px;
    width: 25px;
  }
`;

const ApostleAttributeItem: React.FC<Props> = ({ title, attribute, className, iconUrl, bgColor }) => {
  return (
    <StyledABC123 className={className}>
      <StyledAttrIconBox bgColor={bgColor}>
        <StyledAttrIcon src={iconUrl} alt='attribute' />
      </StyledAttrIconBox>
      <StyledFontAttr>{title}</StyledFontAttr>
      <ScaleText>{attribute?.title}</ScaleText>
    </StyledABC123>
  );
};

export default ApostleAttributeItem;
