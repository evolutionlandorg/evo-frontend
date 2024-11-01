// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BareProps } from '../types';

const Content: React.FC<BareProps> = ({ className, children, style }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default styled(Content)`
  background: ${({ theme }) => theme.colors.backgroundContent};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  ${tw`rounded-lg`}
`;
