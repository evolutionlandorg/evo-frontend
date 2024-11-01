// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { Button, ButtonProps } from 'components';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { useApostleClaim } from 'hooks/useApostle';
import { useTranslation } from 'react-i18next';

interface Props extends BareProps, ButtonProps {
  tokenId: string;
  landId: SUPPORTED_LANDS_INDEX;
  callback?: () => void;
}

const StyledUnclaimedRewardButton = styled.div`
  align-items: center;
`;

export const UnclaimedRewardButton: React.FC<Props> = ({ className, landId, tokenId, callback, children, ...props }) => {
  const { handleApostleClaim, pendingTx } = useApostleClaim(landId, tokenId);
  const { t } = useTranslation('apostle');

  return (
    <StyledUnclaimedRewardButton className={className}>
      <Button
        scale='sm'
        isLoading={pendingTx}
        onClick={(e) => {
          e.stopPropagation();
          handleApostleClaim();
          callback && callback();
        }}
        {...props}
      >
        {t('Claim')}
      </Button>
    </StyledUnclaimedRewardButton>
  );
};
