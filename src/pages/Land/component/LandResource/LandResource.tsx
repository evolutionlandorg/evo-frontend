// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { LandResource as Resource } from 'hooks/backendApi/types';
import { StyledFontAttr } from 'ui/styled';
import { Box, Flex, ScaleText } from 'components';
import tw from 'twin.macro';

export interface Props extends BareProps {
  resource: Resource;
}

const StyledLandResource = styled(Box)`
  align-items: center;
  ${tw`w-full`}
`;

const StyledTokenImage = styled.img`
  display: inline-block;
  height: 20px;
  width: 20px;
`;

const LandResource: React.FC<Props> = ({ className, resource }) => {
  return (
    <StyledLandResource className={className}>
      <div className='flex flex-row flex-wrap justify-between	'>
        <div className='mr-2'>
          <StyledFontAttr>GOLD</StyledFontAttr>
          <Flex className='items-center space-x-2 mt-1'>
            <StyledTokenImage src='/images/token/gold.svg' alt='gold token' />
            <ScaleText>{resource.gold_rate}</ScaleText>
          </Flex>
        </div>
        <div className='mr-2'>
          <StyledFontAttr>WOOD</StyledFontAttr>
          <Flex className='items-center space-x-2 mt-1'>
            <StyledTokenImage src='/images/token/wood.svg' alt='wood token' />
            <ScaleText>{resource.wood_rate}</ScaleText>
          </Flex>
        </div>
        <div className='mr-2'>
          <StyledFontAttr>WATER</StyledFontAttr>
          <Flex className='items-center space-x-2 mt-1'>
            <StyledTokenImage src='/images/token/water.svg' alt='water token' />
            <ScaleText>{resource.water_rate}</ScaleText>
          </Flex>
        </div>
        <div className='mr-2'>
          <StyledFontAttr>FIRE</StyledFontAttr>
          <Flex className='items-center space-x-2 mt-1'>
            <StyledTokenImage src='/images/token/fire.svg' alt='fire token' />
            <ScaleText>{resource.fire_rate}</ScaleText>
          </Flex>
        </div>
        <div>
          <StyledFontAttr>SOIL</StyledFontAttr>
          <Flex className='items-center space-x-2 mt-1'>
            <StyledTokenImage src='/images/token/soil.svg' alt='soil token' />
            <ScaleText>{resource.soil_rate}</ScaleText>
          </Flex>
        </div>
      </div>
    </StyledLandResource>
  );
};

export default LandResource;
