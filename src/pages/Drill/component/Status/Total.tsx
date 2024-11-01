// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';

import { BareProps } from 'components/types';
import { Text } from 'components';

export interface Props extends BareProps {
  data: string | number;
}

const StyledStatus = styled.div`
  align-items: center;
`;

const Total: React.FC<Props> = ({ data }) => (
  <StyledStatus>
    <Text>Total: {data}</Text>
  </StyledStatus>
);

export default Total;
