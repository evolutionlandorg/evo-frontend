// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import ApiContext from 'api/apiContext';
import type { ApiProps } from 'api/types';
import { useContext } from 'react';

export const useApi = (): ApiProps => {
  return useContext(ApiContext);
};
