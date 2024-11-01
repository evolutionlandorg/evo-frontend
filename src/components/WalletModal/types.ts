// Copyright 2018-2021 evolution.land authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NetworkInfo } from 'config';
import { FC } from 'react';
import { SUPPORTED_LANDS_INDEX } from 'types';
import { SvgProps } from '../Svg/types';

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  TronInjectConnect = 'troninjectconnect',
  Clover = 'clover',
  WalletLink = 'walletlink',
  UnstoppableDomains = 'unstoppabledomains',
  Talisman = 'talisman'
}

export type Login = (connectorId: ConnectorNames) => void;

export interface Config {
  title: string;
  icon: FC<SvgProps>;
  connectorId: ConnectorNames;
  priority: number;
  supportLand: SUPPORTED_LANDS_INDEX[];
  creator: (network: NetworkInfo) => any;
}
