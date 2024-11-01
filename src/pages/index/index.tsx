// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Box, Flex, LinkExternal, ScaleFlex, ScaleH1, Text } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { SUPPORTED_LANDS } from 'config/continents';
import { ContinentItem } from './component';

const StyledHeaderBox = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 2px solid ${({ theme }) => theme.colors.menuLineBorderColor};
  justify-content: flex-start;
  padding: 14px;
  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: center;
  }
`;

const StyledLandsBox = styled(ScaleFlex)`
  align-items: center;
  padding-top: 3rem;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

const isLandActive = (land: SUPPORTED_LANDS_INDEX) => SUPPORTED_LANDS.includes(land);

const Index: React.FC<BareProps> = ({ className }) => {
  const { t } = useTranslation();

  return (
    <Box className={className}>
      <StyledHeaderBox justifyContent='center' alignItems='center'>
        <ScaleH1>{t('Choose a continent')}</ScaleH1>
        <LinkExternal className='absolute right-4' href='https://docs.evolution.land/getting-started/choose-start-continent'>
          {t('How to Choose')}
        </LinkExternal>
      </StyledHeaderBox>
      <StyledLandsBox>
        <ContinentItem isActive={isLandActive('1')} landId='1' />
        <ContinentItem isActive={isLandActive('2')} landId='2' />
        <ContinentItem isActive={isLandActive('3')} landId='3' />
        <ContinentItem isActive={isLandActive('4')} landId='4' />
        <ContinentItem isActive={isLandActive('5')} landId='5' />
      </StyledLandsBox>
    </Box>
  );
};

export default Index;
