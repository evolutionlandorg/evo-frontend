// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef, useEffect, useState } from 'react';
import _ from 'lodash';
import tw from 'twin.macro';
import styled, { useTheme } from 'styled-components';
import BigNumber from 'bignumber.js';
import { BareProps } from 'components/types';

export interface Props extends BareProps {
  points: BigNumber[];
  currentPoint?: BigNumber;
}

const StyledChart = styled.svg`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  ${tw`rounded`}
`;

function generatePath(width, height, maxPoint: BigNumber, points: BigNumber[]) {
  const maxWidth = points.length - 1;

  return points
    .map((p, i) => {
      const xPct = (i / maxWidth) * 100;
      const x = (width / 100) * xPct;
      const yPct = 100 - p.div(maxPoint).toNumber() * 100;
      const y = (height / 100) * yPct;
      if (i === 0) {
        return `M0,${y}`;
      }

      return `L${x},${y}`;
    })
    .join(' ');
}

function generatePolygon(width, height, maxPoint: BigNumber, points: BigNumber[]) {
  const maxWidth = points.length - 1;

  const linePoints = points
    .map((p, i) => {
      const xPct = (i / maxWidth) * 100;
      const x = (width / 100) * xPct;
      const yPct = 100 - p.div(maxPoint).toNumber() * 100;
      const y = (height / 100) * yPct;
      if (i === 0) {
        return `0,${y}`;
      }

      return `${x},${y}`;
    })
    .join(' ');

  return `0,${height} ${linePoints} ${width},${height}`;
}

// function generateCurrentPricePoint(width, height, maxPoint: BigNumber, currentPoint: BigNumber) {
//     const xPct = currentPoint.div(width).toNumber() * 100;
//     const x = (width / 100) * xPct;
//     const yPct = 100 - (currentPoint.div(maxPoint).toNumber() * 100);
//     const y = (height / 100) * yPct;
//     return {x, y};
// }

const AuctionChart: React.FC<Props> = ({ className, points, currentPoint }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const height = 200;
  const maxPoint = _.reduce(
    points,
    (result, item) => {
      return result.gt(item) ? result : item;
    },
    new BigNumber(0)
  ).times(1.2);
  const path = generatePath(width, height, maxPoint, points);
  const polygon = generatePolygon(width, height, maxPoint, points);
  // const point = generateCurrentPricePoint(width, height, maxPoint, currentPoint);

  useEffect(() => {
    setWidth(ref?.current?.getBoundingClientRect().width);
  }, [ref]);

  return (
    <StyledChart className={className} width='100%' ref={ref} height={height}>
      <polygon points={polygon} fill='#66e47b40' stroke='#000000' strokeWidth={0} />
      <path d={path} stroke={theme.colors.chartLineGreen} strokeWidth='2' fill='none' />
      {/* <circle cx={point.x} cy={point.y} r="4" stroke="#66e47b" strokeWidth="2" fill='#66e47b'/> */}
    </StyledChart>
  );
};

export default AuctionChart;
