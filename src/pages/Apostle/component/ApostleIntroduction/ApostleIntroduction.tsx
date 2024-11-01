// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'components';
import { BareProps } from 'components/types';
import { shortenAddress } from 'utils';
import { bundleApi } from 'api';
import { SUPPORTED_LANDS_INDEX } from 'types';

export interface Props extends BareProps {
  landId: SUPPORTED_LANDS_INDEX;
  address: string;
  name: string;
  introduction: string;
}

const StyledApostleIntroduction = styled.div`
  align-items: center;
`;

// const StyledAvatar = styled.div`
//   width: 48px;
//   height: 48px;
//   ${tw`border-2 border-gray-600 rounded-full`}
// `;

const ApostleIntroduction: React.FC<Props> = ({ className, landId, address, name, introduction }) => {
  const displayAddress = bundleApi[landId].toDisplayAddress(address);

  return (
    <StyledApostleIntroduction className={className}>
      <Flex justifyContent='space-between' alignItems='center'>
        <Flex alignItems='center'>
          {/* <StyledAvatar /> */}
          <Text>{name}</Text>
        </Flex>
        <Text>{address ? shortenAddress(displayAddress) : ''}</Text>
      </Flex>
      <Text className='mt-4'>{introduction}</Text>
    </StyledApostleIntroduction>
  );
};

export default ApostleIntroduction;
