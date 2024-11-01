// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { useTooltip } from 'hooks/useTooltip';
import { BareProps } from 'components/types';
import ImageApostleBreed from './images/apostle-breed.png';
import ImageApostleMining from './images/apostle-mining.png';
import ImageApostlePVE from './images/apostle-pve.png';
import ImageApostlePVP from './images/apostle-pvp.png';
import ImageLandApostleWorking from './images/land-apostleworking.png';
import ImageLandDrillWorking from './images/land-drillworking.png';
import ImageEquipmentEquipped from './images/equipment-equipped.png';

const StatusIcon = {
  'apostle-breed': { image: ImageApostleBreed, text: 'Apostle Breed' },
  'apostle-mining': { image: ImageApostleMining, text: 'Apostle Mining' },
  'apostle-pve': { image: ImageApostlePVE, text: 'Apostle PVE' },
  'apostle-pvp': { image: ImageApostlePVP, text: 'Apostle PVP' },
  'land-apostleworking': { image: ImageLandApostleWorking, text: 'Apostle Mining' },
  'land-drillworking': { image: ImageLandDrillWorking, text: 'Drill Mining' },
  'equipment-equipped': { image: ImageEquipmentEquipped, text: 'Equipped' }
} as const;

export type StatusKey = keyof typeof StatusIcon;
export interface Props extends BareProps {
  statusKey: StatusKey;
}

const StyledStatus = styled.div`
  align-items: center;
  display: inline-block;

  img {
    border-radius: 5px;
    height: 20px;
    overflow: hidden;
    width: 20px;
  }
`;

const Status: React.FC<Props> = ({ className, statusKey }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(StatusIcon[statusKey].text || '', { placement: 'auto', trigger: 'hover' });

  if (!StatusIcon[statusKey]) {
    return null;
  }

  return (
    <StyledStatus className={className}>
      {tooltipVisible && tooltip}
      <img ref={targetRef} src={StatusIcon[statusKey].image} alt='...' />
    </StyledStatus>
  );
};

export default Status;
