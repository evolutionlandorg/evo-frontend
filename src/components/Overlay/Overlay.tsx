// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';
import { OverlayProps } from './types';

const Overlay = styled.div.attrs({ role: 'presentation' })<OverlayProps>`
  background-color: ${({ theme }) => theme.colors.overlay};
  height: 100%;
  left: 0;
  opacity: ${({ show }) => (show ? 0.8 : 0)};
  pointer-events: ${({ show }) => (show ? 'initial' : 'none')};
  position: fixed;
  top: 0;
  transition: opacity 0.4s;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex};
`;

Overlay.defaultProps = {
  show: false,
  zIndex: 10
};

export default Overlay;
