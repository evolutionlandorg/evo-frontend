// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { FilterIcon, Text, Flex } from 'components';
import { useTooltip } from 'hooks/useTooltip';
import { StyledPoint } from 'ui/styled';
import { useTranslation } from 'react-i18next';
import { COLOR_BY_TYPE } from '../../utils';
import { StyledLegendIconBox } from '../../styled';

export interface Props extends BareProps {
  number?: string;
}

const StyledLegendContent = styled(Flex)`
  border-radius: 12px;
  flex-wrap: wrap;
  width: 250px;
`;

const StyledLegendItem = styled(Flex)`
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  width: 100px;
`;

const LegendData = [
  {
    label: 'First Sale',
    color: COLOR_BY_TYPE[4]
  },
  {
    label: 'Reserved',
    color: COLOR_BY_TYPE[5]
  },
  {
    label: 'Unowned',
    color: COLOR_BY_TYPE[6]
  },
  {
    label: 'Mysterious',
    color: COLOR_BY_TYPE[10]
  },
  {
    label: 'Owned',
    color: COLOR_BY_TYPE[7]
  },
  {
    label: 'Mine',
    color: COLOR_BY_TYPE[8]
  },
  {
    label: 'Resale',
    color: COLOR_BY_TYPE[9]
  }
];

const LegendContent: React.FC<BareProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <StyledLegendContent className={className}>
      {LegendData.map((legend) => (
        <StyledLegendItem key={legend.label}>
          <StyledPoint backgroundColor={legend.color} />
          <Text small bold color='#fff'>
            {t(`landtype_${legend.label}`)}
          </Text>
        </StyledLegendItem>
      ))}
    </StyledLegendContent>
  );
};

const Legend: React.FC<Props> = ({ className }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <LegendContent />
    </>,
    { placement: 'auto', trigger: 'hover' }
  );

  return (
    <StyledLegendIconBox className={className} ref={targetRef}>
      <FilterIcon color='textSubtle' />
      {tooltipVisible && tooltip}
    </StyledLegendIconBox>
  );
};

export default Legend;
