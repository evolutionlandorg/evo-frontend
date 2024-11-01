// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BigNumber from 'bignumber.js';
import dayjs, { Dayjs } from 'dayjs';

export const day2Seconds = (day: number | string): BigNumber =>
  // 86400 = 24 * 3600
  new BigNumber(day).times(86400);

export const formatDate = (day: number): string => dayjs.unix(day).format('DD/MM/YYYY');

export const formatTime = (day: number): string => dayjs.unix(day).format('DD/MM/YYYY HH:mm');

export const formatTimeWithSecond = (day: number): string => dayjs.unix(day).format('DD/MM/YYYY HH:mm:ss');

export const relativeTime = (diffTime: Dayjs): string => {
  const s = diffTime.unix();
  const day = Math.floor(s / 3600 / 24);
  const hour = Math.floor((s / 3600) % 24);
  const minute = Math.floor((s / 60) % 60);
  const second = Math.floor(s % 60);

  if (day > 0) {
    return `${day}d ${hour}h`;
  }

  if (hour > 0) {
    return `${hour}h ${minute}m`;
  }

  if (minute > 0) {
    return `${minute}m ${second}s`;
  }

  if (second > 0) {
    return `${second}s`;
  }

  return '';
};
