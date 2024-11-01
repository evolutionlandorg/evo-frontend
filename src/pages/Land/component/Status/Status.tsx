// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';
import type { Land } from 'hooks/backendApi/types';
import { useTranslation } from 'react-i18next';
import { ClaimLandAssetButton } from '../Buttons';
import StatusReadonly from './StatusReadonly';

export interface Props extends BareProps {
  status: string;
  landId: SUPPORTED_LANDS_INDEX;
  data: Land;
}

const Status: React.FC<Props> = ({ className, status, landId, data }) => {
  // const { RING } = LandConfig[extendLandId(landId)].tokens;
  const { t } = useTranslation();
  switch (status) {
    case 'unclaimed':
      return (
        <ClaimLandAssetButton scale='xs' landId={landId} landTokenId={data.token_id}>
          {t('Claim')}
        </ClaimLandAssetButton>
      );
    default:
      return <StatusReadonly status={status} landId={landId} data={data} className={className} />;
  }
};

export default Status;
