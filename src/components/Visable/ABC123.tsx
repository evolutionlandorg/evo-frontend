// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';

export interface Props extends BareProps {
  number: string;
}

const StyledABC123 = styled.div`
  align-items: center;
`;

const ABC123: React.FC<Props> = ({ className, number }) => {
  return <StyledABC123>{number}</StyledABC123>;
};

export default ABC123;
