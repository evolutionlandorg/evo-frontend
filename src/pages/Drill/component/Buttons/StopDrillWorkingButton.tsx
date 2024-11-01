// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { BareProps } from 'components/types';
import { Button, ButtonProps } from 'components';
import { useDrillStopWork } from 'hooks/useDrill';

interface Props extends BareProps, ButtonProps {
  landId: SUPPORTED_LANDS_INDEX;
  landTokenId: string;
  slotIndex: number;
}

export const StopDrillWorkingButton: React.FC<Props> = ({ className, landId, landTokenId, slotIndex, children, ...props }) => {
  const { handleDrillStopWork, pendingTx } = useDrillStopWork(landId);

  return (
    <Button
      className={className}
      scale='sm'
      isLoading={pendingTx}
      onClick={(e) => {
        e.stopPropagation();
        handleDrillStopWork(landTokenId, slotIndex);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
