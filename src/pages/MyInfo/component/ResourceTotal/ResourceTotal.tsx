// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Flex, Text } from 'components';
import tw from 'twin.macro';
import { TokenAmount } from '@evolutionland/evolution-js';
import { getFullDisplayBalance } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';

export interface Props extends BareProps {
  number?: string;
  amounts: TokenAmount[];
}

const StyledResourceTotal = styled.div`
  display: flex;
  align-items: center;
  ${tw`space-x-3`}
`;

const StyledResourceItem = styled(Flex)`
  align-items: center;
  justify-content: center;
`;

const StyledTokenImage = styled.img`
  display: inline-block;
  height: 15px;
  margin-right: 0.25rem;
  width: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 20px;
    width: 20px;
  }
`;

const ResourcesTotal: React.FC<Props> = ({ className, amounts }) => {
  return (
    <StyledResourceTotal className={className}>
      <StyledResourceItem>
        <StyledTokenImage src='/images/token/gold.svg' alt='gold token' />
        <Text>{getFullDisplayBalance(new BigNumber(amounts[0].raw.toString()), amounts[0].token.decimals, 2)}</Text>
      </StyledResourceItem>
      <StyledResourceItem>
        <StyledTokenImage src='/images/token/wood.svg' alt='wood token' />
        <Text>{getFullDisplayBalance(new BigNumber(amounts[1].raw.toString()), amounts[1].token.decimals, 2)}</Text>
      </StyledResourceItem>
      <StyledResourceItem>
        <StyledTokenImage src='/images/token/water.svg' alt='water token' />
        <Text>{getFullDisplayBalance(new BigNumber(amounts[2].raw.toString()), amounts[2].token.decimals, 2)}</Text>
      </StyledResourceItem>
      <StyledResourceItem>
        <StyledTokenImage src='/images/token/fire.svg' alt='fire token' />
        <Text>{getFullDisplayBalance(new BigNumber(amounts[3].raw.toString()), amounts[3].token.decimals, 2)}</Text>
      </StyledResourceItem>
      <StyledResourceItem>
        <StyledTokenImage src='/images/token/soil.svg' alt='soil token' />
        <Text>{getFullDisplayBalance(new BigNumber(amounts[4].raw.toString()), amounts[4].token.decimals, 2)}</Text>
      </StyledResourceItem>
    </StyledResourceTotal>
  );
};

export default ResourcesTotal;
