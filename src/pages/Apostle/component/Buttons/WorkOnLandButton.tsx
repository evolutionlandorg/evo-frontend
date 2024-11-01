// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Button, ButtonProps } from 'components';
import { useApostleClaimHire } from 'hooks/useApostle';
import { SUPPORTED_LANDS_INDEX } from 'types';

interface Props extends BareProps, ButtonProps {
  landId: SUPPORTED_LANDS_INDEX;
  apostleTokenId: string;
  landTokenId: string;
}

const StyledButton = styled.div`
  align-items: center;
`;

export const WorkOnLandButton: React.FC<Props> = ({ className, landId, landTokenId, apostleTokenId, children, ...props }) => {
  const { handleApostleClaimHire, pendingTx } = useApostleClaimHire(landId, landTokenId);

  return (
    <StyledButton className={className}>
      <Button
        scale='sm'
        isLoading={pendingTx}
        onClick={(e) => {
          e.stopPropagation();
          handleApostleClaimHire();
        }}
        {...props}
      >
        {children}
      </Button>
    </StyledButton>
  );
};
