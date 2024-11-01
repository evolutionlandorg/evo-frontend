// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { zeroPad } from './utils';

export const TimerRenderer = ({ days, hours, minutes, seconds }) => (
  <span>
    {zeroPad(days)} Days {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
  </span>
);
