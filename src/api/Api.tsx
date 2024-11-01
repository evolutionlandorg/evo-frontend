// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react';

import { useCurrentLand } from 'hooks/useRouterParams';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import ApiContext from './apiContext';
import * as contract from './contract';
import * as evo from './evo';
import { ApiProps } from './types';
import * as utils from './utils';
import bundleApi from './evolutionjs';

interface Props {
  children: React.ReactNode;
}

const Api: React.FC<Props> = (props) => {
  const { children } = props;
  const landId = useCurrentLand();
  const { library, account, chainId, ...web3React } = useActiveWeb3React(landId);
  const evolutionApi = useMemo(() => bundleApi[landId], [landId]);

  const value = useMemo<ApiProps>(() => {
    return { contract, evo, utils, library, account, chainId, landId, evolutionApi, ...web3React };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, evo, utils, library, account, chainId, landId, evolutionApi]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export default Api;
