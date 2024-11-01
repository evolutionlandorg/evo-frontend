// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { useTooltip } from 'hooks/useTooltip';
import { LandBoxProps } from '../types';
import { StyledContainer, StyledHeader, StyledSubtitle, StyledNumberBox, StyledNFTBox, StyledStatusBar, StyledNFTImg } from '../styled';
import { Status } from '../Status';
import { LandTooltip } from '../Tooltip';

const LandBox: React.FC<LandBoxProps> = ({ number, subtitle, imageUrl, footerNode, className, imageOnClick, status, hasTooltip, land }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<LandTooltip land={land} />, { placement: 'auto', trigger: 'hover' });

  return (
    <StyledContainer pointer className={className} onClick={imageOnClick}>
      <StyledHeader>
        <StyledNumberBox>No. {number}</StyledNumberBox>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledHeader>
      <StyledNFTBox ref={targetRef}>
        <StyledNFTImg src={imageUrl} alt='...' />
        <StyledStatusBar>
          {status?.map((item) => (
            <Status key={item} statusKey={item} />
          ))}
        </StyledStatusBar>
      </StyledNFTBox>
      {footerNode && footerNode}
      {hasTooltip && tooltipVisible && tooltip}
    </StyledContainer>
  );
};

export default LandBox;
