// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';

export interface Props extends BareProps {
  visible: boolean;
  empty?: React.ReactNode;
}

const ConditionBox: React.FC<Props> = ({ className, visible, empty, children }) => {
  if (!visible) {
    return <>{empty}</>;
  }

  return <>{children}</>;
};

export default ConditionBox;
