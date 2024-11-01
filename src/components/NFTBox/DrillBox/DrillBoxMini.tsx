// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { Flex } from '../../Box';
import { DrillBoxProps } from '../types';
import { StyledMiniContainer, StyledMiniImg, StyledMiniEmptyIcon } from '../styled';
import ItemsAddIcon from './items-add.png';
import ItemsEmptyIcon from './items-empty.png';

const DrillBoxMini: React.FC<DrillBoxProps> = ({ imageUrl, footerNode, className, imageOnClick, boxSize, ...rest }) => (
  <Flex flexDirection='column'>
    <StyledMiniContainer boxSize={boxSize} className={className} onClick={imageOnClick} {...rest}>
      <StyledMiniImg src={imageUrl} alt='...' />
    </StyledMiniContainer>
    {footerNode && footerNode}
  </Flex>
);

export const DrillBoxMiniEmpty: React.FC<Partial<DrillBoxProps>> = ({ className, imageOnClick, hasAdd, boxSize, ...rest }) => (
  <StyledMiniContainer boxSize={boxSize} pointer={hasAdd} className={className} onClick={imageOnClick} {...rest}>
    {hasAdd ? <StyledMiniEmptyIcon src={ItemsAddIcon} alt='...' /> : <StyledMiniEmptyIcon src={ItemsEmptyIcon} alt='...' />}
  </StyledMiniContainer>
);

export default styled(DrillBoxMini)``;
