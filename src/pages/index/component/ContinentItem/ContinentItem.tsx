// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled from 'styled-components';
import { BareProps } from 'components/types';
import { SUPPORTED_LANDS_INDEX } from 'types';

export interface Props extends BareProps {
  number?: string;
  landId: SUPPORTED_LANDS_INDEX;
  isActive?: boolean;
}

const ContainerWidth = '220px';

const landContainerColor = (landId: SUPPORTED_LANDS_INDEX) => {
  switch (landId) {
    case '1':
      return 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #004E3A 100%)';
    case '2':
      return 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #5F3700 100%)';
    case '3':
      return 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #003F6D 100%)';
    case '4':
      return 'linear-gradient(180deg, rgba(78, 0, 0, 0) 0%, #4B0009 100%)';
    case '5':
      return 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1D0059 100%)';
    default:
      return '';
  }
};

const landIconColor = (landId: SUPPORTED_LANDS_INDEX) => {
  switch (landId) {
    case '1':
      return 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #00D9A7 100%)';
    case '2':
      return 'linear-gradient(180deg, rgba(255, 211, 105, 0) 0%, #FFD067 100%)';
    case '3':
      return 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #33A9FF 100%)';
    case '4':
      return 'linear-gradient(180deg, rgba(255, 151, 152, 0) 0%, #FF9798 100%)';
    case '5':
      return 'linear-gradient(180deg, rgba(161, 115, 255, 0) 0%, #AA80FF 100%)';
    default:
      return '';
  }
};

const StyledContainer = styled.div<{ isActive: boolean }>`
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'no-drop')};
  margin: 1rem;
  position: relative;
  width: ${ContainerWidth};
`;

const StyledBg = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 3px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 18px;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

const StyledContinentItem = styled.div<{ landId: SUPPORTED_LANDS_INDEX }>`
  align-items: center;
  background: ${({ landId }) => landContainerColor(landId)};
  border-radius: 18px;
  height: 100%;
  padding-bottom: 1rem;
  padding-top: 1rem;
  position: relative;
  width: 100%;
  z-index: 2;
`;

const StyledLandIconBox = styled.div`
  align-items: flex-end;
  display: flex;
  height: ${ContainerWidth};
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  width: 100%;
`;

const StyledLandIconBg = styled.div<{ landId: SUPPORTED_LANDS_INDEX }>`
  background: ${({ landId }) => landIconColor(landId)};
  border-radius: 50%;
  height: 80%;
  opacity: 0.2;
  width: 80%;
  z-index: 11;
`;

const StyledLandIcon = styled.div<{ landId: SUPPORTED_LANDS_INDEX }>`
  background: url(${({ landId }) => `/images/continents/prototype/${landId}.png`}) no-repeat top center;
  background-size: contain;
  height: ${ContainerWidth};
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 12;
`;

const StyledChainIconBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledChainImg = styled.img`
  height: 30px;
`;

const ContinentItem: React.FC<Props> = ({ className, landId, isActive = true }) => {
  return (
    <a href={isActive ? `/land/${landId}/market/land` : '/#'}>
      <StyledContainer isActive={isActive} className={className}>
        <StyledBg />
        <StyledContinentItem landId={landId}>
          <StyledLandIconBox>
            <StyledLandIconBg landId={landId} />
            <StyledLandIcon landId={landId} />
          </StyledLandIconBox>
          <StyledChainIconBox>
            <StyledChainImg height='30px' src={`/images/continents/chains/${landId}.png?t=1`} alt='chain' />
          </StyledChainIconBox>
        </StyledContinentItem>
      </StyledContainer>
    </a>
  );
};

export default ContinentItem;
