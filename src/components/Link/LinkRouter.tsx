// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
// import getExternalLinkProps from 'utils/getExternalLinkProps';
import { Link } from 'react-router-dom';
import Text from '../Text/Text';
import { LinkRouterProps } from './types';

const StyledLink = styled(Text)<LinkRouterProps>`
  align-items: center;
  display: flex;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

const LinkRouter: React.FC<LinkRouterProps> = ({ to, ...props }) => {
  return (
    <Link to={to}>
      <StyledLink bold {...props} />
    </Link>
  );
};

LinkRouter.defaultProps = {
  color: 'primary'
};

export default LinkRouter;
