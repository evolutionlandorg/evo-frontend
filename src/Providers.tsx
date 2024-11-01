// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useThemeManager } from 'store/user/hooks';
import { getLibrary } from 'utils/web3React';
import { RefreshContextProvider } from 'contexts/RefreshContext';
import { ToastsProvider } from 'contexts/ToastsContext';
import store from 'store';
import { light, dark } from 'ui/theme';
import { ModalProvider, ModalProvider2 } from 'components';
import { Api } from 'api';
import { dummyClient } from 'config/apollo/client';
import { ApolloProvider } from '@apollo/client';

// https://styled-components.com/docs/api#themeprovider
const ThemeProviderWrapper: React.FC = ({ children }) => {
  const [isDark] = useThemeManager();
  return <ThemeProvider theme={true ? dark : light}>{children}</ThemeProvider>;
};

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* TODO: use mainnet client to replace dummyClient */}
      <ApolloProvider client={dummyClient}>
        <Provider store={store}>
          <ThemeProviderWrapper>
            <ToastsProvider>
              {/* <Api> */}
              <RefreshContextProvider>
                <ModalProvider2>
                  <ModalProvider>{children}</ModalProvider>
                </ModalProvider2>
              </RefreshContextProvider>
              {/* </Api> */}
            </ToastsProvider>
          </ThemeProviderWrapper>
        </Provider>
      </ApolloProvider>
    </Web3ReactProvider>
  );
};

export default Providers;
