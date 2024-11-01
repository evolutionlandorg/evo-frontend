// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Text, Flex } from 'components';
import BigNumber from 'bignumber.js';
import { LandConfig, Token } from '@evolutionland/evolution-js';
import { getDisplayBalanceWithFixd } from 'utils/formatBalance';
import { extendLandId } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';

export const resourceColor = {
  gold: '#FAFA76',
  wood: '#44DA6E',
  water: '#49E9D8',
  fire: '#FF6B82',
  soil: '#FFCD7F'
};

export interface Props extends BareProps {
  landId: SUPPORTED_LANDS_INDEX;
  minedResources: BigNumber[];
}

export interface ResourceItemProps extends BareProps {
  value: BigNumber;
  token: Token;
}

const getResourcePointColor = (symbol: string) => {
  return resourceColor[symbol.toLowerCase()] || resourceColor.gold;
};

const StyledResourceBox = styled.div`
  align-items: center;
  align-self: stretch;
`;

const StyledResourceItemBox = styled(Flex)`
  align-items: center;
  flex: 1;
  justify-content: flex-start;
  margin-right: 0.5rem;
`;

const StyledPoint = styled.div`
  border-radius: 50%;
  display: inline-block;
  height: 11px;
  margin-right: 3px;
  width: 11px;
`;

const ResourceItem: React.FC<ResourceItemProps> = ({ className, value, token }) => {
  return (
    <StyledResourceItemBox className={className} justifyContent='center' alignItems='center'>
      <StyledPoint style={{ background: getResourcePointColor(token.symbol) }} />
      <Text small>{getDisplayBalanceWithFixd(value, token.decimals, 2)}</Text>
    </StyledResourceItemBox>
  );
};

const ResourceBox: React.FC<Props> = ({ landId, className, minedResources }) => {
  const { GOLD, WOOD, WATER, FIRE, SOIL } = LandConfig[extendLandId(landId)].tokens;

  return (
    <StyledResourceBox className={className}>
      <Flex justifyContent='space-between'>
        <ResourceItem value={minedResources[0]} token={GOLD} />
        <ResourceItem value={minedResources[1]} token={WOOD} />
      </Flex>
      <Flex justifyContent='space-between'>
        <ResourceItem value={minedResources[2]} token={WATER} />
        <ResourceItem value={minedResources[3]} token={FIRE} />
      </Flex>
      <Flex justifyContent='space-between'>
        <ResourceItem value={minedResources[4]} token={SOIL} />
      </Flex>
    </StyledResourceBox>
  );
};

export default ResourceBox;
