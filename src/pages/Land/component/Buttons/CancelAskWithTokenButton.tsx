// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { BareProps } from 'components/types';
import { Button, ButtonProps } from 'components';
import { useLandCancelAskWithToken } from 'hooks/useLand';

interface Props extends BareProps, ButtonProps {
  tokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
}

export const CancelAskWithTokenButton: React.FC<Props> = ({ className, landId, tokenId, children, ...props }) => {
  const { handleLandCancelAskWithToken, pendingTx } = useLandCancelAskWithToken(landId, tokenId);

  return (
    <Button
      className={className}
      scale='sm'
      isLoading={pendingTx}
      onClick={(e) => {
        e.stopPropagation();
        handleLandCancelAskWithToken();
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
