// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { useTooltip } from 'hooks/useTooltip';
import { Flex } from '../../Box';
import { ApostleBoxProps } from '../types';
import { StyledMiniContainer, StyledMiniImg, StyledMiniEmptyIcon } from '../styled';
import ApostleAddIcon from './apostle-add.png';
import ApostleEmptyIcon from './apostle-empty.png';
import { ApostleTooltip } from '../Tooltip';

const ApostleBoxMini: React.FC<ApostleBoxProps> = ({ imageUrl, footerNode, className, imageOnClick, boxSize, pointer, apostle, hasTooltip }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<ApostleTooltip talent={apostle?.apostle_talent || apostle?.talent} coldDown={apostle?.cold_down} />, { placement: 'auto', trigger: 'hover' });

  return (
    <Flex flexDirection='column'>
      <StyledMiniContainer boxSize={boxSize} className={className} onClick={imageOnClick} pointer={pointer} ref={targetRef}>
        <StyledMiniImg src={imageUrl} alt='...' />
      </StyledMiniContainer>
      {footerNode && footerNode}
      {hasTooltip && tooltipVisible && tooltip}
    </Flex>
  );
};

export const ApostleBoxMiniEmpty: React.FC<Partial<ApostleBoxProps>> = ({ className, imageOnClick, hasAdd, boxSize }) => (
  <StyledMiniContainer boxSize={boxSize} pointer={hasAdd} className={className} onClick={imageOnClick}>
    {hasAdd ? <StyledMiniEmptyIcon src={ApostleAddIcon} alt='...' /> : <StyledMiniEmptyIcon src={ApostleEmptyIcon} alt='...' />}
  </StyledMiniContainer>
);

export default ApostleBoxMini;
