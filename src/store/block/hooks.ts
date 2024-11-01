// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import useInterval from 'hooks/useInterval';
import useIsWindowVisible from 'hooks/useIsWindowVisible';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'hooks/store';
import { simpleRpcProviderByLandId } from 'utils/providers';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { bundleApi } from 'api';
import { setBlock } from '.';
import { State } from '../types';

export const usePollBlockNumber = (landId: SUPPORTED_LANDS_INDEX, refreshTime = 12000) => {
  const dispatch = useAppDispatch();
  const isWindowVisible = useIsWindowVisible();

  useInterval(
    () => {
      const fetchBlock = async () => {
        try {
          const blockNumber = await bundleApi[landId].getCurrentBlockNumber(simpleRpcProviderByLandId(landId));
          dispatch(setBlock(blockNumber));
        } catch (error) {
          console.info('fetchBlock error', error);
        }
      };

      fetchBlock();
    },
    isWindowVisible ? refreshTime : null,
    true
  );
};

export const useBlock = () => useSelector((state: State) => state.block);

export const useInitialBlock = () => useSelector((state: State) => state.block.initialBlock);
