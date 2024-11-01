// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import useCountdown, { TDate } from 'ahooks/lib/useCountDown';
import { Button } from 'components';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export interface ColdDownButtonProps {
  targetDate: TDate;
}

export const ColdDownButton: FC<ColdDownButtonProps> = ({ children, targetDate }) => {
  const { t } = useTranslation();
  const [number, { hours, minutes, seconds }] = useCountdown({ targetDate });

  const convertToDoubleDigits = useCallback((num: number) => num.toString().padStart(2, '0'), []);

  return (
    <>
      {number ? (
        <Button scale='sm' disabled>
          {`${t('Countdown')}: ${convertToDoubleDigits(hours)}:${convertToDoubleDigits(minutes)}:${convertToDoubleDigits(seconds)}`}
        </Button>
      ) : (
        children
      )}
    </>
  );
};
