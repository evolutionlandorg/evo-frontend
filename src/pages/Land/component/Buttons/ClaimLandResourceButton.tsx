// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { BareProps } from 'components/types';
import { Button, ButtonProps } from 'components';
import { useLandBatchClaimResource } from 'hooks/useLand';

interface Props extends BareProps, ButtonProps {
  landTokenIds: string[];
  landId: SUPPORTED_LANDS_INDEX;
}

export const ClaimLandResourceButton: React.FC<Props> = ({ className, landId, landTokenIds, children, ...props }) => {
  const { handleLandBatchClaimResource, pendingTx } = useLandBatchClaimResource(landId, landTokenIds);

  return (
    <Button
      className={className}
      scale='sm'
      isLoading={pendingTx}
      disabled={!landTokenIds.length}
      onClick={(e) => {
        e.stopPropagation();
        handleLandBatchClaimResource();
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
