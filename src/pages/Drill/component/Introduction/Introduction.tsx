// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { Text } from 'components';
import { BareProps } from 'components/types';
import { Element } from 'types';
import { capitalizedFirstLetter } from 'utils';

export interface Props extends BareProps {
  productivity: string[];
  prefer: Element;
  protectionPeriod: number;
}

const StyledContainer = styled.div`
  align-items: left;
`;

const DrillIntroduction: React.FC<Props> = ({ className, productivity, prefer, protectionPeriod }) => (
  <StyledContainer className={className}>
    <Text>Basic Efficency - {productivity[1]}%</Text>
    {prefer ? (
      <Text>
        {capitalizedFirstLetter(prefer)} Enhancement Efficency - {parseFloat(productivity[0]) - parseFloat(productivity[1])}%
      </Text>
    ) : null}
    {protectionPeriod ? <Text>Initial Protection {protectionPeriod} day(s)</Text> : null}
  </StyledContainer>
);

export default DrillIntroduction;
