// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { Button, ButtonProps } from 'components';
import { useApostleCancelHire } from 'hooks/useApostle';

interface Props extends BareProps, ButtonProps {
  tokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
}

const StyledButton = styled.div`
  align-items: center;
`;

export const CancelHireButton: React.FC<Props> = ({ className, landId, tokenId, children, ...props }) => {
  const { handleApostleCancelHire, pendingTx } = useApostleCancelHire(landId, tokenId);

  return (
    <StyledButton className={className}>
      <Button
        scale='sm'
        isLoading={pendingTx}
        onClick={(e) => {
          e.stopPropagation();
          handleApostleCancelHire();
        }}
        {...props}
      >
        {children}
      </Button>
    </StyledButton>
  );
};
