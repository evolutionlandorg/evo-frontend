// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Button, ButtonProps } from 'components';
import { useLandBatchClaimItemResource } from 'hooks/useLand';
import { bundleApi } from 'api';
import { extendLandId } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';

interface Props extends BareProps, ButtonProps {
  drillTokenIds: string[];
  landId: SUPPORTED_LANDS_INDEX;
}

const StyledButton = styled.div`
  align-items: center;
`;

export const ClaimDrillResourceButton: React.FC<Props> = ({ className, landId, drillTokenIds, children, ...props }) => {
  const drillContractAddress = bundleApi[landId].getAddressByName(extendLandId(landId), 'OBJECTOWNERSHIP');
  const { handleLandClaimItemResource, pendingTx } = useLandBatchClaimItemResource(landId);

  return (
    <StyledButton className={className}>
      <Button
        scale='sm'
        isLoading={pendingTx}
        disabled={!drillTokenIds.length}
        onClick={(e) => {
          e.stopPropagation();
          handleLandClaimItemResource(
            drillTokenIds.map(() => drillContractAddress),
            drillTokenIds
          );
        }}
        {...props}
      >
        {children}
      </Button>
    </StyledButton>
  );
};
