// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { InjectedConnector } from '@web3-react/injected-connector';
import { TronInjectConnector } from 'utils/troninject-connector';
import { TalismanConnector } from 'utils/talismanConnector';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import sample from 'lodash/sample';
import { CloverConnector } from '@clover-network/clover-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { UAuthConnector } from '@uauth/web3-react';
import Metamask from '../Svg/Icons/Metamask';
import WalletConnect from '../Svg/Icons/WalletConnect';
import TronIcon from '../Svg/Icons/Tron';
import MathWallet from '../Svg/Icons/MathWallet';
import TokenPocket from '../Svg/Icons/TokenPocket';
import CloverWallet from '../Svg/Icons/CloverWallet';
import UnstoppableDomains from '../Svg/Icons/UnstoppableDomains';
import CoinbaseWallet from '../Svg/Icons/CoinbaseWallet';
import { TalismanIcon, WombatIcon } from '../Svg';
import { Config, ConnectorNames } from './types';

const POLLING_INTERVAL = 12000;
const CHAIN = process.env.REACT_APP_CHAIN;

const injectCreator = (network) => {
  const chainId = parseInt(network.chainId, 16);
  const injected = new InjectedConnector({ supportedChainIds: [chainId] });
  return injected;
};

const walletconnectCreator = (network) => {
  const chainId = parseInt(network.chainId, 16);

  return new WalletConnectConnector({
    rpc: { [chainId]: sample(network.rpcUrls) },
    qrcode: true,
    pollingInterval: POLLING_INTERVAL
  });
};

const cloverConnector = (network) => {
  const chainId = parseInt(network.chainId, 16);

  return new CloverConnector({ supportedChainIds: [chainId] });
};

const walletLinkConnector = (network) => {
  const chainId = parseInt(network.chainId, 16);

  return new WalletLinkConnector({
    url: sample(network.rpcUrls),
    appName: 'EvolutionLand',
    appLogoUrl: 'https://portal.evolution.land/logo192.png',
    supportedChainIds: [chainId]
  });
};

const unstoppableDomainConnector = (network) => {
  const params =
    CHAIN === 'mainnet'
      ? {
          clientID: '3970bbcd-b299-43c3-875e-ce3603adf510',
          redirectUri: 'https://portal.evolution.land',
          postLogoutRedirectUri: 'https://portal.evolution.land',
          scope: 'openid wallet',
          connectors: { injected: injectCreator(network), walletconnect: walletconnectCreator(network) }
        }
      : {
          clientID: 'a20911c3-079f-42a2-ba96-756110b60342',
          redirectUri: 'http://localhost:3000',
          postLogoutRedirectUri: 'http://localhost:3000',
          scope: 'openid wallet',
          connectors: { injected: injectCreator(network), walletconnect: walletconnectCreator(network) }
        };

  return new UAuthConnector(params);
};

const tronInjectCreator = (network) => {
  const chainId = parseInt(network.chainId, 16);
  const injected = new TronInjectConnector({ supportedChainIds: [chainId] });
  return injected;
};

const talismanCreator = (network) => {
  const chainId = parseInt(network.chainId, 16);
  return new TalismanConnector({ supportedChainIds: [chainId] });
};

const connectors: Config[] = [
  {
    title: 'Metamask',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 1,
    supportLand: ['1', '3', '4', '5'],
    creator: injectCreator
  },
  {
    title: 'TronLink',
    icon: TronIcon,
    connectorId: ConnectorNames.TronInjectConnect,
    priority: 2,
    supportLand: ['2'],
    creator: tronInjectCreator
  },
  // {
  //   title: 'Trust Wallet',
  //   icon: TrustWallet,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 3
  // },
  {
    title: 'Math Wallet',
    icon: MathWallet,
    connectorId: ConnectorNames.Injected,
    priority: 7,
    supportLand: ['1', '3', '4', '5'],
    creator: injectCreator
  },
  {
    title: 'Token Pocket',
    icon: TokenPocket,
    connectorId: ConnectorNames.Injected,
    priority: 2,
    supportLand: ['1', '3', '4', '5'],
    creator: injectCreator
  },
  {
    title: 'Clover Wallet',
    icon: CloverWallet,
    connectorId: ConnectorNames.Clover,
    priority: 6,
    supportLand: ['3', '4', '5'],
    creator: cloverConnector
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
    priority: 4,
    supportLand: ['3', '4', '5'],
    creator: walletconnectCreator
  },
  {
    title: 'Coinbase Wallet',
    icon: CoinbaseWallet,
    connectorId: ConnectorNames.WalletLink,
    priority: 3,
    supportLand: ['3', '4', '5'],
    creator: walletLinkConnector
  },
  {
    title: 'Unstoppable Domains',
    icon: UnstoppableDomains,
    connectorId: ConnectorNames.UnstoppableDomains,
    priority: 8,
    supportLand: ['3', '4', '5'],
    creator: unstoppableDomainConnector
  },
  {
    title: 'Talisman',
    icon: TalismanIcon,
    connectorId: ConnectorNames.Talisman,
    priority: 5,
    supportLand: ['1', '4', '5'],
    creator: talismanCreator
  },
  {
    title: 'Wombat',
    icon: WombatIcon,
    connectorId: ConnectorNames.Injected,
    priority: 2.1,
    supportLand: ['1', '4', '5'],
    creator: injectCreator
  }
  // {
  //   title: 'SafePal',
  //   icon: SafePal,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999
  // },
  // {
  //   title: 'Coin98',
  //   icon: Coin98,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999
  // }
];

export const getConnectorsByLandId = (landId: SUPPORTED_LANDS_INDEX): Config[] => connectors.filter((connector) => connector.supportLand.includes(landId));

export default connectors;
export const connectorLocalStorageKey = 'connectorIdv2';
export const walletLocalStorageKey = 'wallet';
