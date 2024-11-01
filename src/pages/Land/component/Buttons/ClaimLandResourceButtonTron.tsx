// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { BareProps } from 'components/types';
import { Button, ButtonProps } from 'components';
import { useLandClaimResource } from 'hooks/useLand';

interface Props extends BareProps, ButtonProps {
  landTokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
}

export const ClaimLandResourceButtonTron: React.FC<Props> = ({ className, landId, landTokenId, children, ...props }) => {
  const { handleLandClaimResource, pendingTx } = useLandClaimResource(landId, landTokenId);

  return (
    <Button
      className={className}
      scale='sm'
      isLoading={pendingTx}
      disabled={!landTokenId}
      onClick={(e) => {
        e.stopPropagation();
        handleLandClaimResource();
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
