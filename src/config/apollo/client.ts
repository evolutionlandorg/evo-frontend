// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApolloClient, InMemoryCache } from '@apollo/client';

const baseConfig = {
  cache: new InMemoryCache(),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache'
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
} as const;

export const mumbaiClient = new ApolloClient({
  ...baseConfig,
  uri: 'https://api.thegraph.com/subgraphs/name/evolutionlandorg/evolutionland-polygon-dev'
});
export const polygonClient = new ApolloClient({
  ...baseConfig,
  uri: 'https://api.thegraph.com/subgraphs/name/evolutionlandorg/evolutionland-polygon'
});

export const crabTestClient = new ApolloClient({
  ...baseConfig,
  uri: 'https://crab-thegraph.darwinia.network/subgraphs/name/evolutionlandorg/evolutionland-crab-dev'
});
export const crabClient = new ApolloClient({
  ...baseConfig,
  uri: 'https://crab-thegraph.darwinia.network/subgraphs/name/evolutionlandorg/evolutionland-crab'
});

export const dummyClient = new ApolloClient({
  ...baseConfig,
  uri: ''
});
