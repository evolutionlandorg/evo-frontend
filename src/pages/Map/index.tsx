// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-param-reassign */

import React, { useEffect, useMemo, useState } from 'react';
import { TileMap, Layer, Coord, RenderOverlayerCallback } from '@evolutionland/lands-tile-map';
import styled from 'styled-components';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCurrentLand } from 'hooks/useRouterParams';
import { useLoadTiles } from 'hooks/useMap';
import MapDetail from 'pages/Land/mapDetail';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { env } from 'config';
import { Flex } from 'components';
import tw from 'twin.macro';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'hooks/useSearch';
import { AtlasTile } from './types';
import { COLOR_BY_TYPE } from './utils';
import { LandModal } from './styled';
import { Legend, Rank } from './component';

interface StateProps {
  name?: string;
}

const Container = styled.div`
  min-height: calc(100vh - 96px);
`;

const StyledTipBox = styled(Flex)`
  ${tw`space-x-3`}

  left: 30px;
  bottom: 75px;
  position: absolute;
  z-index: 10;

  ${({ theme }) => theme.mediaQueries.sm} {
    bottom: 30px;
    left: 30px;
  }
`;

const initXY: Record<SUPPORTED_LANDS_INDEX, { x: number; y: number }> = {
  '1': { x: -90, y: 0 },
  '2': { x: 90, y: 0 },
  '3': { x: 0, y: 45 },
  '4': { x: -45, y: 0 },
  '5': { x: 45, y: 0 }
};

let atlas: Record<string, AtlasTile> | null = null;

let selected: Coord | null = null;

function isSelected(x: number, y: number) {
  // return selected.some((coord) => coord.x === x && coord.y === y);
  return selected && selected.x === x && selected.y === y;
}

const getTile = (x: number, y: number) => {
  const id = `${x},${y}`;
  if (atlas !== null && id in atlas) {
    const tile = atlas[id];
    return tile;
  }

  return null;
};

const atlasLayer: Layer = (x, y) => {
  const id = `${x},${y}`;
  if (atlas !== null && id in atlas) {
    const tile = atlas[id];
    const color = COLOR_BY_TYPE[tile.type];

    const top = !!tile.top;
    const left = !!tile.left;
    const topLeft = !!tile.topLeft;

    return {
      color,
      top,
      left,
      topLeft,
      image: tile.image
    };
  }
  return {
    color: (x + y) % 2 === 0 ? COLOR_BY_TYPE[13] : COLOR_BY_TYPE[14]
  };
};

const selectedStrokeLayer: Layer = (x, y) => (isSelected(x, y) ? { color: '#ff0044', scale: 1.4 } : null);

const selectedFillLayer: Layer = (x, y) => (isSelected(x, y) ? { color: '#ff9990', ...atlasLayer(x, y), scale: 1.2 } : null);
// return isSelected(x, y) ? { color: '#ff9990', scale: 1.2 } : null;

const MapUpdater: React.FC<{ atlasOnChange?: () => void }> = ({ atlasOnChange }) => {
  const landId = useCurrentLand();
  const { account } = useActiveWeb3React(landId);
  const { tiles: tiles1 } = useLoadTiles('1', account);
  const { tiles: tiles2 } = useLoadTiles('2', account);
  const { tiles: tiles3 } = useLoadTiles('3', account);
  const { tiles: tiles4 } = useLoadTiles('4', account);
  const { tiles: tiles5 } = useLoadTiles('5', account);

  useEffect(() => {
    atlas = { ...atlas, ...tiles1, ...tiles2, ...tiles3, ...tiles4, ...tiles5 };
    atlasOnChange && atlasOnChange();
  }, [atlasOnChange, tiles1, tiles2, tiles3, tiles4, tiles5]);
  return <></>;
};

const renderOverlayerCallback: RenderOverlayerCallback = (ctx, width, height, size, pan, nw, se, center) => {
  if (!ctx) return;
  const scale = 1;
  const keys = Object.keys(initXY);
  const halfSize = scale ? (size * scale) / 2 : size / 2;
  const fontsize = 100 * (size / 14);
  ctx.font = ` 700 ${fontsize}px system-ui`;
  ctx.textAlign = `center`;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';

  keys.forEach((value: string) => {
    const { x, y } = initXY[value as SUPPORTED_LANDS_INDEX];
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const offsetX = (center.x - x) * size + (pan ? pan.x : 0);
    const offsetY = (y - center.y) * size + (pan ? pan.y : 0);

    ctx.fillText(env[value as SUPPORTED_LANDS_INDEX].NAME, halfWidth - offsetX + halfSize, halfHeight - offsetY + halfSize);
  });
};

const Map: React.FC<StateProps> = () => {
  const [selectedTile, setSelectedTile] = useState<AtlasTile>(selected ? getTile(selected.x, selected.y) : null);
  const landId = useCurrentLand();
  const history = useHistory();
  const { url } = useRouteMatch();
  const search = useQuery();

  const isCurrentLand = useMemo(() => selectedTile?.landId === landId, [landId, selectedTile?.landId]);
  const initalLocation = initXY[landId];

  const landClickHandle = (x, y) => {
    if (isSelected(x, y)) {
      // selected = selected.filter((coord) => coord.x !== x || coord.y !== y);
      selected = null;
    } else {
      search.set('x', x);
      search.set('y', y);
      history.push({ pathname: url, search: `?${search}` });
      setSelectedTile(getTile(x, y));
      selected = { x, y };
    }
  };

  const gobackHandle = () => {
    setSelectedTile(null);
    selected = null;
    history.push({ pathname: url });
  };

  const atlasOnChangeHandle = () => {
    try {
      const x = parseInt(search.get('x'));
      const y = parseInt(search.get('y'));

      setSelectedTile(getTile(x, y));
      selected = { x, y };
    } catch (error) {
      console.info('map::atlasOnChangeHandle', error);
    }
  };

  return (
    <Container>
      <TileMap className='atlas' layers={[atlasLayer, selectedStrokeLayer, selectedFillLayer]} x={initalLocation.x} y={initalLocation.y} renderOverlayerCallback={renderOverlayerCallback} onClick={landClickHandle} />
      <MapUpdater atlasOnChange={atlasOnChangeHandle} />

      <StyledTipBox>
        <Legend />
        <Rank landId={landId} history={history} />
      </StyledTipBox>

      {selectedTile && (
        <LandModal>
          <MapDetail isCurrentLand={isCurrentLand} onGoBack={gobackHandle} landTokenId={selectedTile.token_id} />
        </LandModal>
      )}
    </Container>
  );
};

export default Map;
