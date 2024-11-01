// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Illustrated } from 'hooks/backendApi';
import { Box, BoxProps } from 'components';
import { StyledAttributesText } from '../../styled';

export interface Props extends BareProps, BoxProps {
  illustrated: Illustrated;
}

const StyledAttributesTextBox = styled(Box)`
  align-items: center;
`;

const AttributesText: React.FC<Props> = ({ illustrated, className, ...props }) => {
  // return {
  //   mining: `Mining Efficiency +${illustrated.productivity[0]}%`,
  //   miningSpecific: `Mining Efficiency +${illustrated.productivity[1]}%`,
  //   protection: `Initial Protection +${illustrated.protection_period} days`
  // }

  return (
    <StyledAttributesTextBox className={className} {...props}>
      <StyledAttributesText>Mining +{illustrated?.productivity[0] || '0'}%</StyledAttributesText>
      <StyledAttributesText>Mining Efficiency +{illustrated?.productivity[1] || '0'}%</StyledAttributesText>
      <StyledAttributesText>Initial Protection +{illustrated?.protection_period || '0'}%</StyledAttributesText>
    </StyledAttributesTextBox>
  );
};

export default AttributesText;
