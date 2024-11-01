// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { StyledContainer, StyledHeader, StyledSubtitle, StyledNumberBox, StyledNFTBox, StyledStatusBar, StyledNFTImg } from '../styled';
import { DrillBoxProps } from '../types';
import { Status } from '../Status';

const DrillBox: React.FC<DrillBoxProps> = ({ title, status, subtitle, imageUrl, footerNode, className, imageOnClick }) => (
  <StyledContainer pointer className={className} onClick={imageOnClick}>
    <StyledHeader>
      <StyledNumberBox>{title}</StyledNumberBox>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </StyledHeader>
    <StyledNFTBox>
      <StyledNFTImg src={imageUrl} alt='...' />
      <StyledStatusBar>
        {status?.map((item) => (
          <Status key={item} statusKey={item} />
        ))}
      </StyledStatusBar>
    </StyledNFTBox>
    {footerNode && footerNode}
  </StyledContainer>
);

export default DrillBox;
