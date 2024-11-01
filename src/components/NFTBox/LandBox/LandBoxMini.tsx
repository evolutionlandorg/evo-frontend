// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Flex } from '../../Box';
import { ApostleBoxProps } from '../types';
import { StyledMiniContainer, StyledMiniImg } from '../styled';
// import ApostleAddIcon from './apostle-add.png';
// import ApostleEmptyIcon from './apostle-empty.png';

const LandBoxMini: React.FC<ApostleBoxProps> = ({ imageUrl, footerNode, className, imageOnClick, boxSize, pointer, ...props }) => (
  <Flex flexDirection='column' {...props}>
    <StyledMiniContainer boxSize={boxSize} className={className} onClick={imageOnClick} pointer={pointer}>
      <StyledMiniImg src={imageUrl} alt='...' />
    </StyledMiniContainer>
    {footerNode && footerNode}
  </Flex>
);

// export const LandBoxMiniEmpty: React.FC<Partial<ApostleBoxProps>> = ({ className, imageOnClick, hasAdd, boxSize }) => (
//   <StyledMiniContainer boxSize={boxSize} pointer={hasAdd} className={className} onClick={imageOnClick}>
//     {hasAdd ? <StyledMiniEmptyIcon src={ApostleAddIcon} alt='...' /> : <StyledMiniEmptyIcon src={ApostleEmptyIcon} alt='...' />}
//   </StyledMiniContainer>
// );

export default LandBoxMini;
