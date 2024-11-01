// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Illustrated } from 'hooks/backendApi';
import { Box, BoxProps, Flex } from 'components';
import tw from 'twin.macro';
import { StyledAttributesText } from '../../styled';
import ArrowImage from './arrow.svg';

export interface Props extends BareProps, BoxProps {
  originIllustrated: Illustrated;
  targetIllustrated: Illustrated;
}

const StyledAttributesDiffTextBox = styled(Flex)`
  align-items: center;
  ${tw`font-semibold`}
`;

const AttributesDiffText: React.FC<Props> = ({ originIllustrated, targetIllustrated, className, ...props }) => {
  return (
    <StyledAttributesDiffTextBox className={className} {...props} justifyContent='space-between'>
      <Box>
        <StyledAttributesText>Mining +{originIllustrated?.productivity[0] || '0'}%</StyledAttributesText>
        <StyledAttributesText>Mining Efficiency +{originIllustrated?.productivity[1] || '0'}%</StyledAttributesText>
        <StyledAttributesText>Initial Protection +{originIllustrated?.protection_period || '0'}%</StyledAttributesText>
      </Box>
      <Box>
        <img src={ArrowImage} alt='enchant to' />
      </Box>
      <Box>
        <StyledAttributesText>+{targetIllustrated?.productivity[0] || '0'}%</StyledAttributesText>
        <StyledAttributesText>+{targetIllustrated?.productivity[1] || '0'}%</StyledAttributesText>
        <StyledAttributesText>+{targetIllustrated?.protection_period || '0'}%</StyledAttributesText>
      </Box>
    </StyledAttributesDiffTextBox>
  );
};

export default AttributesDiffText;
