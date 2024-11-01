// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Text } from 'components';
import React, { FC, useCallback, useMemo } from 'react';
import type { Apostle } from 'hooks/backendApi/types';
import useCountdown from 'ahooks/lib/useCountDown';
import { useTranslation } from 'react-i18next';

interface BirthStatusProps {
  data: Apostle;
}

const BirthStatus: FC<BirthStatusProps> = ({ data, children }) => {
  const { t } = useTranslation();
  const targetDate = useMemo(() => {
    if (!data) {
      return null;
    }

    const { duration, cold_down_end, apostle_status } = data;

    let delay = Date.now();

    if (duration) {
      delay += duration * 1000;
    }

    if (cold_down_end && cold_down_end > 0) {
      if (apostle_status === 'fresh') {
        delay += cold_down_end * 1000;
      } else {
        delay = cold_down_end;
      }
    }

    return delay;
  }, [data]);
  const [number, { days, hours, minutes, seconds }] = useCountdown({ targetDate });

  const convertToDoubleDigits = useCallback((num: number) => num.toString().padStart(2, '0'), []);

  return (
    <>
      {number ? (
        <Text small bold center>
          {`${t('Countdown')}: ${days > 0 ? `${days} ${t('days')} ` : `${convertToDoubleDigits(hours)}:${convertToDoubleDigits(minutes)}:${convertToDoubleDigits(seconds)}`}`}
        </Text>
      ) : (
        children
      )}
    </>
  );
};

export default BirthStatus;
