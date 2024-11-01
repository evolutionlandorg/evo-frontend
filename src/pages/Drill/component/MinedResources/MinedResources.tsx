// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { BareProps } from 'components/types';
import { Flex, ScaleText } from 'components';
import { useLandGetAvailableItemResources } from 'hooks/useLand';
import { ContinentDistrictEnum } from 'config/continents';
import { getFullDisplayBalance } from 'utils/formatBalance';
import tw from 'twin.macro';
import { StyledFontAttr } from 'ui/styled';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useTranslation } from 'react-i18next';
import { ClaimDrillResourceButton } from '../Buttons/ClaimDrillResourceButton';

export interface Props extends BareProps {
  landId: SUPPORTED_LANDS_INDEX;
  chainId: number;
  drillTokenId: string;
  hasClaimButton?: boolean;
}

const StyledMinedResources = styled.div`
  align-items: center;
`;

const StyledTokenImage = styled.img`
  display: inline-block;
  height: 20px;
  width: 20px;
`;

const MinedResources: React.FC<Props> = ({ landId, drillTokenId, chainId, hasClaimButton }) => {
  const { t } = useTranslation();
  const minedResources = useLandGetAvailableItemResources(landId, drillTokenId);
  const isEmptyResources = useMemo(() => {
    return _.every(minedResources, (item) => item.isZero());
  }, [minedResources]);

  return (
    <StyledMinedResources>
      <div className='flex flex-row flex-wrap justify-between	'>
        <div className='mr-2'>
          <StyledFontAttr>GOLD</StyledFontAttr>
          <Flex className='items-center space-x-2 mt-1'>
            <StyledTokenImage src='/images/token/gold.svg' alt='gold token' />
            <ScaleText>{getFullDisplayBalance(minedResources[0], 18, 2)}</ScaleText>
          </Flex>
        </div>
        <div className='mr-2'>
          <StyledFontAttr>WOOD</StyledFontAttr>
          <Flex className='items-center space-x-2 mt-1'>
            <StyledTokenImage src='/images/token/wood.svg' alt='wood token' />
            <ScaleText>{getFullDisplayBalance(minedResources[1], 18, 2)}</ScaleText>
          </Flex>
        </div>
        <div className='mr-2'>
          <StyledFontAttr>WATER</StyledFontAttr>
          <Flex className='items-center space-x-2 mt-1'>
            <StyledTokenImage src='/images/token/water.svg' alt='water token' />
            <ScaleText>{getFullDisplayBalance(minedResources[2], 18, 2)}</ScaleText>
          </Flex>
        </div>
        <div className='mr-2'>
          <StyledFontAttr>FIRE</StyledFontAttr>
          <Flex className='items-center space-x-2 mt-1'>
            <StyledTokenImage src='/images/token/fire.svg' alt='fire token' />
            <ScaleText>{getFullDisplayBalance(minedResources[3], 18, 2)}</ScaleText>
          </Flex>
        </div>
        <div>
          <StyledFontAttr>SOIL</StyledFontAttr>
          <Flex className='items-center space-x-2 mt-1'>
            <StyledTokenImage src='/images/token/soil.svg' alt='soil token' />
            <ScaleText>{getFullDisplayBalance(minedResources[4], 18, 2)}</ScaleText>
          </Flex>
        </div>
      </div>
      {hasClaimButton ? (
        <ClaimDrillResourceButton disabled={isEmptyResources} className='w-full mt-4' landId={landId} drillTokenIds={[drillTokenId]}>
          {t('Claim Resources')}
        </ClaimDrillResourceButton>
      ) : null}
    </StyledMinedResources>
  );
};

export default MinedResources;
