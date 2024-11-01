// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import BigNumber from 'bignumber.js';

import { BareProps } from 'components/types';
import { Text } from 'components';
import { extendLandId } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import type { Apostle } from 'hooks/backendApi/types';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { LandConfig } from '@evolutionland/evolution-js';
import { BirthButton, UnclaimedRewardButton } from '../Buttons';
import StatusReadonly from './StatusReadonly';
import BirthStatus from './BirthStatus';

export interface Props extends BareProps {
  status: string;
  landId: SUPPORTED_LANDS_INDEX;
  data: Apostle;
}

const Status: React.FC<Props> = ({ className, status, landId, data }) => {
  const { RING } = LandConfig[extendLandId(landId)].tokens;

  if (data.cold_down_end && data.cold_down_end > 0) {
    return (
      <BirthStatus data={data}>
        <StatusReadonly status={status} landId={landId} data={data} className={className} />
      </BirthStatus>
    );
  }

  switch (status) {
    case 'birthUnclaimed':
      return <BirthButton scale='xs' landId={landId} motherTokenId={data.mother} />;
    case 'unclaimed':
      return <UnclaimedRewardButton scale='xs' landId={landId} tokenId={data.token_id} />;
    case 'onsell':
      return (
        <Text small bold center>
          {getFullDisplayBalance(new BigNumber(data.current_price), 0, 2)} {data?.token?.symbol}
        </Text>
      );
    case 'birth':
      return (
        <BirthStatus data={data}>
          <BirthButton scale='xs' landId={landId} motherTokenId={data.mother} />
        </BirthStatus>
      );
    default:
      return <StatusReadonly status={status} landId={landId} data={data} className={className} />;
  }
};

export default Status;
