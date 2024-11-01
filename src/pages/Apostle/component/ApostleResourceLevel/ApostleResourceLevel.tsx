// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { BareProps } from 'components/types';
import { StyledFontAttr } from 'ui/styled';
import { Box, Flex, ScaleText } from 'components';
import tw from 'twin.macro';
import { Element } from 'types';

export type Props = BareProps &
  {
    [n in Element]: number;
  };

const StyledApostleResource = styled(Box)`
  align-items: center;
  ${tw`w-full`}
`;

const StyledTokenImage = styled.img`
  display: inline-block;
  height: 15px;
  width: 15px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 20px;
    width: 20px;
  }
`;

const ApostleResourceLevel: React.FC<Props> = ({ className, gold, wood, water, fire, soil }) => {
  return (
    <StyledApostleResource className={className}>
      <div className='flex flex-row flex-wrap justify-between'>
        <div className='mr-2'>
          <StyledFontAttr>GOLD</StyledFontAttr>
          <Flex className={cx('items-center space-x-2 mt-1', { 'filter brightness-50': !gold })}>
            <StyledTokenImage src='/images/token/gold.svg' alt='gold token' />
            <ScaleText>Lv.{gold}</ScaleText>
          </Flex>
        </div>
        <div className='mr-2'>
          <StyledFontAttr>WOOD</StyledFontAttr>
          <Flex className={cx('items-center space-x-2 mt-1', { 'filter brightness-50': !wood })}>
            <StyledTokenImage src='/images/token/wood.svg' alt='wood token' />
            <ScaleText>Lv.{wood}</ScaleText>
          </Flex>
        </div>
        <div className='mr-2'>
          <StyledFontAttr>WATER</StyledFontAttr>
          <Flex className={cx('items-center space-x-2 mt-1', { 'filter brightness-50': !water })}>
            <StyledTokenImage src='/images/token/water.svg' alt='water token' />
            <ScaleText>Lv.{water}</ScaleText>
          </Flex>
        </div>
        <div className='mr-2'>
          <StyledFontAttr>FIRE</StyledFontAttr>
          <Flex className={cx('items-center space-x-2 mt-1', { 'filter brightness-50': !fire })}>
            <StyledTokenImage src='/images/token/fire.svg' alt='fire token' />
            <ScaleText>Lv.{fire}</ScaleText>
          </Flex>
        </div>
        <div>
          <StyledFontAttr>SOIL</StyledFontAttr>
          <Flex className={cx('items-center space-x-2 mt-1', { 'filter brightness-50': !soil })}>
            <StyledTokenImage src='/images/token/soil.svg' alt='soil token' />
            <ScaleText>Lv.{soil}</ScaleText>
          </Flex>
        </div>
      </div>
    </StyledApostleResource>
  );
};

export default ApostleResourceLevel;
