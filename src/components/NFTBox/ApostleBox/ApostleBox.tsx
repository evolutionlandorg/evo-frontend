// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { useTooltip } from 'hooks/useTooltip';
import { StyledFontTitle } from 'ui/styled';
import { useTranslation } from 'react-i18next';
import { HarbergerCompleted, HarbergerStart } from 'components/Svg';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ApostleBoxProps } from '../types';
import { StyledContainer, StyledHeader, StyledSubtitle, StyledNumberBox, StyledNFTBox, StyledStatusBar, StyledNFTImg, StyledEmptyIcon } from '../styled';
import { Status } from '../Status';
import ApostleAddIcon from './apostle-add.png';
import { Flex } from '../../Box';
import { ApostleTooltip } from '../Tooltip';

const StyledHarbergerCompleted = styled(HarbergerCompleted)`
  position: absolute;
  ${tw`top-[-0.75rem] left-0`}
`;

const ApostleBox: React.FC<ApostleBoxProps> = ({ number, subtitle, imageUrl, footerNode, className, imageOnClick, status, apostle, hasTooltip }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<ApostleTooltip talent={apostle?.apostle_talent} coldDown={apostle?.cold_down} />, { placement: 'auto', trigger: 'hover' });

  return (
    <StyledContainer pointer className={className} onClick={imageOnClick}>
      <StyledHeader>
        <StyledNumberBox>No. {number}</StyledNumberBox>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledHeader>
      <StyledNFTBox ref={targetRef}>
        {!!apostle?.haberger_mode && <StyledHarbergerCompleted />}
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

export const ApostleBoxEmpty: React.FC<Partial<ApostleBoxProps>> = ({ className, imageOnClick, hasAdd }) => {
  const { t } = useTranslation();

  return (
    <StyledContainer pointer={hasAdd} className={className} onClick={imageOnClick}>
      {hasAdd ? (
        <Flex width='140px' flexDirection='column' alignItems='center'>
          <StyledEmptyIcon src={ApostleAddIcon} alt='...' />
          <StyledFontTitle>{t('Choose Apostle')}</StyledFontTitle>
        </Flex>
      ) : null}
    </StyledContainer>
  );
};

export default ApostleBox;
