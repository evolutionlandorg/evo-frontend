// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
// import tw from 'twin.macro';
import styled from 'styled-components';
import { Flex, Text } from 'components';
import { BareProps } from 'components/types';
import { shortenAddress } from 'utils';

export interface Props extends BareProps {
  address: string;
  name: string;
}

const StyledLandIntroduction = styled.div`
  align-items: center;
`;

// const StyledAvatar = styled.div`
//   width: 48px;
//   height: 48px;
//   ${tw`border-2 border-gray-600 rounded-full`}
// `;

const LandIntroduction: React.FC<Props> = ({ className, address, name }) => {
  return (
    <StyledLandIntroduction className={className}>
      <Flex justifyContent='space-between' alignItems='center'>
        <Flex alignItems='center'>
          {/* <StyledAvatar /> */}
          <Text>{name}</Text>
        </Flex>
        <p>{shortenAddress(address)}</p>
      </Flex>
    </StyledLandIntroduction>
  );
};

export default LandIntroduction;
