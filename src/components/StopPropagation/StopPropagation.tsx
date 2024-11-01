// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';

export interface Props extends BareProps {
  number: string;
}

const StyledStopPropagation = styled.div`
  align-items: center;
`;

const StopPropagation: React.FC<BareProps> = ({ className, children, ...props }) => {
  const handleStopPropagation = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <StyledStopPropagation className={className} onClick={handleStopPropagation} {...props}>
      {children}
    </StyledStopPropagation>
  );
};

export default StopPropagation;
