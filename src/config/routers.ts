// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { SUPPORTED_LANDS_FOR_ROUTER } from './continents';

export interface RouterState {
  path: string;
  exact?: boolean;
  component: string;
}

export type RoutersState = Array<RouterState>;

// component within src/pages

const routers: RoutersState = [
  {
    path: '/',
    exact: true,
    component: 'index/index.tsx'
  },
  {
    path: `/land/:landId(${SUPPORTED_LANDS_FOR_ROUTER})`,
    component: 'ContinentLayout/index.tsx'
  },
  {
    path: '*',
    component: 'index/index.tsx'
  }
  // {
  //   path: '/test',
  //   component: 'Test/index.tsx'
  // }
];

export default routers;
