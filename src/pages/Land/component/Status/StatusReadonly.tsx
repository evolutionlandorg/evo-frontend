// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import BigNumber from 'bignumber.js';

import { BareProps } from 'components/types';
import { Text } from 'components';
import { SUPPORTED_LANDS_INDEX } from 'types';
import type { Land } from 'hooks/backendApi/types';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useTranslation } from 'react-i18next';
import { formatTime } from 'utils/time';

export interface Props extends BareProps {
  status: string;
  landId: SUPPORTED_LANDS_INDEX;
  data: Land;
}

const statusMaps = {
  unclaimed: 'Unclaimed'
};

export const parseApostleStatus = (key) => statusMaps[key] ?? key;

const Status: React.FC<Props> = ({ className, status, data }) => {
  const { t } = useTranslation();

  switch (status) {
    case 'onsell':
      if (data.current_price === '-1') {
        return (
          <Text className={className} small bold center>
            {t('For Sale')} ({formatTime(data.auction_start_at)})
          </Text>
        );
      }

      return (
        <Text className={className} small bold center>
          {getFullDisplayBalance(new BigNumber(data.current_price), 0, 2)} {data?.token?.symbol}
        </Text>
      );
    case 'fresh':
      return (
        <Text small bold center>
          &nbsp;
        </Text>
      );
    default:
      return (
        <Text small bold center>
          {t(parseApostleStatus(status))}
        </Text>
      );
  }
};

export default Status;
