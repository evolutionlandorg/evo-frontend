// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import env from 'config/env';
import { AtlasTile, Land } from 'pages/Map/types';
import { decodeLandType } from 'pages/Map/utils';
import { useEffect, useState } from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { $get } from 'utils/agent';
import { FETCH_ERROR } from './backendApi/constants';

export const useLoadTiles = (landId: SUPPORTED_LANDS_INDEX, owner: string) => {
  const [tiles, setTiles] = useState<Record<string, AtlasTile>>({});
  const [lands, setLands] = useState<Land[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiNetwork = env[landId].BACKEND_API_NETWORK;
        const response = await $get(`/api/lands?district=${landId}`, { 'EVO-NETWORK': apiNetwork });
        setLands(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error(FETCH_ERROR, error);
        setIsLoading(false);
      }
    };

    if (landId) {
      fetchData();
    }
  }, [landId]);

  useEffect(() => {
    const typeTiles = {};
    lands.forEach((land: Land) => {
      const image = new Image();
      image.src = land.cover;

      typeTiles[`${land.lon},${land.lat}`] = {
        ...land,
        landId,
        type: decodeLandType(landId, land, owner),
        image: land.cover ? image : null
      };
    });
    setTiles(typeTiles);
  }, [landId, lands, owner]);

  return { tiles, isLoading };
};
