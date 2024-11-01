// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Flex } from 'components/Box';
import React, { ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  background: ${({ theme }) => theme.colors.backgroundGradientContent};
  border-radius: ${({ theme }) => theme.radii.circle};
  height: 0;
  padding-top: 100%;
  position: relative;
  width: 100%;

  /* filter: drop-shadow(0 0 0 transparent); */

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 10rem;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 11.25rem;
  }
`;

const Img = styled.img`
  left: 10%;
  position: absolute;
  top: 10%;
  width: 80%;

  /* &:hover{
    transition: filter 1s ease;
    filter: drop-shadow(0 0 .2rem ${({ theme }) => theme.colors.primary})
  } */
`;

const StyledNFTImg = ({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
    <Wrapper justifyContent='center' className={className}>
      <Img {...props} />
    </Wrapper>
  );

export default StyledNFTImg;
