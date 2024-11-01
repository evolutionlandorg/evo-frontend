// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { $get } from 'utils/agent';

export const getLands = (data: Record<string, unknown>) => {
  return $get('/api/lands', data);
};
