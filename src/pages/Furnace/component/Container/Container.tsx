// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Wrapper = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
  justify-items: center;
  ${tw`mt-7`}
  ${({ theme }) => theme.mediaQueries.md} {
    gap: 10rem;
    grid-template-columns: 1fr 1fr;
  }
`;

const Container: FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;
