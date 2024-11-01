// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { RouterParams } from 'pages/ContinentLayout/types';
import { SUPPORTED_LANDS_INDEX } from 'types';

export const useCurrentLand = () => {
  const { landId } = useParams<RouterParams>();

  const refLandId = useRef(landId);

  const [currentLandId, setCurrentLandId] = useState<SUPPORTED_LANDS_INDEX>(landId);

  useEffect(() => {
    if (landId !== refLandId.current) {
      console.info('useCurrentLand landId !== refLandId.current');

      setCurrentLandId(landId);
      refLandId.current = landId;
    }
  }, [landId]);

  return currentLandId;
};
