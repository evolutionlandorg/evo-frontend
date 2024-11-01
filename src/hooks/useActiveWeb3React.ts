// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState, useRef } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { simpleRpcProviderByLandId } from 'utils/providers';
// eslint-disable-next-line import/no-unresolved
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { SUPPORTED_LANDS_INDEX } from 'types';

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = (landId: SUPPORTED_LANDS_INDEX): Web3ReactContextInterface<Web3Provider> => {
  const { library, chainId, ...web3React } = useWeb3React();
  const refEth = useRef(library);
  const [provider, setprovider] = useState(library || simpleRpcProviderByLandId(landId));

  useEffect(() => {
    if (library !== refEth.current) {
      setprovider(library || simpleRpcProviderByLandId(landId));
      refEth.current = library;
    }
  }, [landId, library]);
  // console.info('useActiveWeb3React', { library: provider, chainId: chainId ?? parseInt(process.env.REACT_APP_CHAIN_ID || '0', 10), ...web3React });
  return { library: provider, chainId: chainId ?? parseInt(process.env.REACT_APP_CHAIN_ID || '0', 10), ...web3React };
};

export default useActiveWeb3React;
