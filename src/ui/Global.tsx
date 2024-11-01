// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createGlobalStyle } from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { EvolutionLandTheme } from 'ui/theme';

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends EvolutionLandTheme {}
}

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background} url('/images/layout/content-bg.png') top center no-repeat;
    background-size: contain;
    font-weight: 500;

    img {
      height: auto;
      max-width: 100%;
    }
  }

  /* unstoppable domain */
  .uauth-vanilla-ui {
    color: #000;

    input {
      color: #4b47ee;
    }
  }
`;

export default GlobalStyle;
