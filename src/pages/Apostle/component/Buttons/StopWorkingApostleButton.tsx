// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { Button, ButtonProps } from 'components';
import { useApostleStopWorking } from 'hooks/useApostle';

interface Props extends BareProps, ButtonProps {
  tokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
}

export const StopWorkingApostleButton: React.FC<Props> = ({ className, landId, tokenId, children, ...props }) => {
  const { handleApostleStopWorking, pendingTx } = useApostleStopWorking(landId, tokenId);

  return (
    <Button
      className={className}
      scale='sm'
      isLoading={pendingTx}
      onClick={(e) => {
        e.stopPropagation();
        handleApostleStopWorking();
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
