// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import getExternalLinkProps from 'utils/getExternalLinkProps';
import Text from '../Text/Text';
import { LinkProps } from './types';

const StyledLink = styled(Text)<LinkProps>`
  align-items: center;
  display: flex;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

const Link: React.FC<LinkProps> = ({ external, ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {};
  // @ts-ignore
  return <StyledLink as='a' bold {...internalProps} {...props} />;
};

Link.defaultProps = {
  color: 'primary'
};

export default Link;
