// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import styled, { css } from 'styled-components';
import { BareProps } from 'components/types';
import { getExplorerLink } from 'utils';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { Token } from '@evolutionland/evolution-js';
import { registerToken } from 'utils/wallet';
import { getSwapUrl } from 'utils/dex';
import { DexSwapIcon } from '../Svg';
import ImageEtherscan from './etherscan.png';
import ImageMetamask from './metamask.png';

export interface Props extends BareProps {
  landId: SUPPORTED_LANDS_INDEX;
  token: Token;
  small?: boolean;
}

const StyledTokenLink = styled.a`
  align-items: center;
`;

const StyledTokenRegister = styled.div`
  align-items: center;
  cursor: pointer;
`;

const tokenIconStyle = css<{ small: boolean }>`
  height: ${({ small }) => (small ? '16px' : '20px')};
  width: ${({ small }) => (small ? '16px' : '20px')};
`;

const StyledTokenIcon = styled.img<{ small: boolean }>`
  ${tokenIconStyle}
`;

const StyledSvgIcon = styled(DexSwapIcon)<{ small: boolean }>`
  ${tokenIconStyle}
`;

export const TokenLink: React.FC<Props> = ({ landId, className, token, small }) => {
  if (!token) {
    return null;
  }

  const explorerLink = getExplorerLink(landId, token.address, 'token');

  return (
    <StyledTokenLink className={className} target='_blank' rel='noopener noreferrer' href={explorerLink}>
      <StyledTokenIcon src={ImageEtherscan} alt='...' small={small} />
    </StyledTokenLink>
  );
};

export const TokenRegister: React.FC<Props> = ({ landId, className, token, small }) => {
  if (!token) {
    return null;
  }

  return (
    <StyledTokenRegister className={className} onClick={() => registerToken(token.address, token.symbol, token.decimals)}>
      <StyledTokenIcon src={ImageMetamask} alt='...' small={small} />
    </StyledTokenRegister>
  );
};

export const SwapLink: React.FC<Props> = ({ landId, className, token, small }) => {
  if (!token) {
    return null;
  }

  const swapUrl = getSwapUrl(landId, undefined, token.address);

  if (!swapUrl) return null;

  return (
    <StyledTokenLink className={className} target='_blank' rel='noopener noreferrer' href={swapUrl}>
      <StyledSvgIcon small={small} />
    </StyledTokenLink>
  );
};
