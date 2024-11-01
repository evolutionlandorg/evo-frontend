// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import SpinImage from './images/spin.png';
import { SpinnerProps } from './types';

const Container = styled.div`
  position: relative;
`;

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <Container>
      <img alt='spin' src={SpinImage} width={`${size}px`} />
    </Container>
  );
};

export default Spinner;
