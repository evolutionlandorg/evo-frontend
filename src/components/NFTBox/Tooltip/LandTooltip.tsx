// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Land } from 'hooks/backendApi';
import { parseResource } from 'utils/land';
import { Flex, Box } from '../../Box';
import { Text } from '../../Text';

export interface Props extends BareProps {
  land: Land;
}

const StyledLandTooltip = styled.div`
  align-items: center;
  width: 120px;
`;

const StyledTokenImage = styled.img`
  display: inline-block;
  height: 15px;
  width: 15px;
`;

const StyledResourceValue = styled.p`
  font-size: 14px;
  margin-left: 0.5rem;
`;

const LandTooltip: React.FC<Props> = ({ className, land }) => {
  const decodeResource = parseResource(land.resource);

  return (
    <StyledLandTooltip className={className}>
      <Box className='w-full'>
        <Flex>
          <Text>{land.name}</Text>
        </Flex>

        <Flex className='w-full'>
          <Flex flex='1' alignItems='center'>
            <StyledTokenImage src='/images/token/gold.svg' alt='gold token' />
            <StyledResourceValue>{decodeResource.gold_rate}</StyledResourceValue>
          </Flex>
          <Flex flex='1' alignItems='center'>
            <StyledTokenImage src='/images/token/wood.svg' alt='wood token' />
            <StyledResourceValue>{decodeResource.wood_rate}</StyledResourceValue>
          </Flex>
        </Flex>
        <Flex className='w-full'>
          <Flex flex='1' alignItems='center'>
            <StyledTokenImage src='/images/token/water.svg' alt='water token' />
            <StyledResourceValue>{decodeResource.water_rate}</StyledResourceValue>
          </Flex>
          <Flex flex='1' alignItems='center'>
            <StyledTokenImage src='/images/token/fire.svg' alt='fire token' />
            <StyledResourceValue>{decodeResource.fire_rate}</StyledResourceValue>
          </Flex>
        </Flex>
        <Flex className='w-full'>
          <Flex flex='1' alignItems='center'>
            <StyledTokenImage src='/images/token/soil.svg' alt='soil token' />
            <StyledResourceValue>{decodeResource.soil_rate}</StyledResourceValue>
          </Flex>
          <Flex flex='1' alignItems='center' />
        </Flex>
      </Box>
    </StyledLandTooltip>
  );
};

export default LandTooltip;
